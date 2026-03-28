// ============================================
// QuickChat-SearchUsers — Standalone Lambda (with Cognito fallback)
// Paste this ENTIRE file into the AWS Lambda Console code editor
// ============================================

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const USERS_TABLE = process.env.USERS_TABLE || 'QuickChat-Users';

function success(body = {}) {
  return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' }, body: JSON.stringify(body) };
}
function error(statusCode = 500, message = 'Internal Server Error') {
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: message }) };
}

export const handler = async (event) => {
  const currentUserId = event.queryStringParameters?.userId;
  const query = event.queryStringParameters?.query;
  if (!currentUserId) return error(400, 'Missing userId query parameter');

  try {
    // 1. Query DynamoDB first
    const params = {
      TableName: USERS_TABLE,
      FilterExpression: 'userId <> :currentUser',
      ExpressionAttributeValues: { ':currentUser': currentUserId },
    };
    if (query && query.trim()) {
      params.FilterExpression += ' AND (contains(#dn, :q) OR contains(email, :q))';
      params.ExpressionAttributeNames = { '#dn': 'displayName' };
      params.ExpressionAttributeValues[':q'] = query.trim().toLowerCase();
    }

    const result = await docClient.send(new ScanCommand(params));
    let users = result.Items || [];

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      users = users.filter(u => (u.displayName || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q));
    }

    // 2. Cognito fallback if few results
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    if (userPoolId && users.length < 5) {
      try {
        const cognitoParams = { UserPoolId: userPoolId, Limit: 20 };
        if (query && query.trim()) cognitoParams.Filter = `email ^= "${query.trim()}"`;
        
        const cognitoResult = await cognitoClient.send(new ListUsersCommand(cognitoParams));
        const cognitoUsers = (cognitoResult.Users || []).map(cu => {
          const attrs = {};
          (cu.Attributes || []).forEach(a => { attrs[a.Name] = a.Value; });
          return { userId: attrs.sub, email: attrs.email || '', displayName: attrs.name || (attrs.email ? attrs.email.split('@')[0] : 'User'), status: 'offline', source: 'cognito' };
        });

        const existingIds = new Set(users.map(u => u.userId));
        for (const cu of cognitoUsers) {
          if (cu.userId && cu.userId !== currentUserId && !existingIds.has(cu.userId)) users.push(cu);
        }

        if (query && query.trim()) {
          const q = query.trim().toLowerCase();
          users = users.filter(u => (u.displayName || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q));
        }
      } catch (cognitoErr) {
        console.warn('Cognito fallback failed (non-fatal):', cognitoErr.message);
      }
    }

    return success({ users: users.map(u => ({ userId: u.userId, displayName: u.displayName, email: u.email, status: u.status || 'offline' })) });
  } catch (err) {
    console.error('SearchUsers error:', err);
    return error(500, 'Failed to search users');
  }
};
