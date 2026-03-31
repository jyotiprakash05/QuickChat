import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { success, error } from './shared/response.mjs';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'ap-south-1',
});

export const handler = async (event) => {
  const currentUserId = event.queryStringParameters?.userId;
  const query = event.queryStringParameters?.query;

  if (!currentUserId) {
    return error(400, 'Missing userId query parameter');
  }

  try {
    // 1. Query DynamoDB first (primary source)
    const params = {
      TableName: TABLES.USERS,
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

    // Client-side case-insensitive filtering (DynamoDB contains is case-sensitive)
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      users = users.filter(u =>
        (u.displayName || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      );
    }

    // 2. If DynamoDB returned few or no results, also check Cognito as fallback
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    if (userPoolId && users.length < 5) {
      try {
        const cognitoParams = {
          UserPoolId: userPoolId,
          Limit: 20,
        };

        // Add filter for Cognito if query is provided
        if (query && query.trim()) {
          // Cognito supports filtering by email, name, etc.
          cognitoParams.Filter = `email ^= "${query.trim()}"`;
        }

        const cognitoResult = await cognitoClient.send(new ListUsersCommand(cognitoParams));
        const cognitoUsers = (cognitoResult.Users || [])
          .filter(cu => cu.UserStatus === 'CONFIRMED')
          .map(cu => {
            const attrs = {};
            (cu.Attributes || []).forEach(a => { attrs[a.Name] = a.Value; });
            return {
              userId: attrs.sub,
              email: attrs.email || '',
              displayName: attrs.name || (attrs.email ? attrs.email.split('@')[0] : 'User'),
              status: 'offline', // We don't know their real status from Cognito
              source: 'cognito',
            };
          });

        // Merge: add Cognito users that are NOT already in DynamoDB results
        const existingIds = new Set(users.map(u => u.userId));
        for (const cu of cognitoUsers) {
          if (cu.userId && cu.userId !== currentUserId && !existingIds.has(cu.userId)) {
            users.push(cu);
          }
        }

        // If we had a query, re-filter combined results (Cognito filter is prefix-only)
        if (query && query.trim()) {
          const q = query.trim().toLowerCase();
          users = users.filter(u =>
            (u.displayName || '').toLowerCase().includes(q) ||
            (u.email || '').toLowerCase().includes(q)
          );
        }
      } catch (cognitoErr) {
        // Cognito lookup is a best-effort fallback — don't fail the whole request
        console.warn('Cognito fallback failed (non-fatal):', cognitoErr.message);
      }
    }

    return success({
      users: users.map(u => ({
        userId: u.userId,
        displayName: u.displayName,
        email: u.email,
        status: u.status || 'offline',
      })),
    });
  } catch (err) {
    console.error('SearchUsers error:', err);
    return error(500, 'Failed to search users');
  }
};

