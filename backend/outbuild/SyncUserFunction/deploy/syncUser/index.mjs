// ============================================
// QuickChat-SyncUser — Standalone Lambda
// Paste this ENTIRE file into the AWS Lambda Console code editor
// ============================================

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });
const USERS_TABLE = process.env.USERS_TABLE || 'QuickChat-Users';

function success(body = {}) {
  return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' }, body: JSON.stringify(body) };
}
function error(statusCode = 500, message = 'Internal Server Error') {
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: message }) };
}

export const handler = async (event) => {
  let body;
  try { body = JSON.parse(event.body); } catch { return error(400, 'Invalid JSON body'); }

  const { userId, email, displayName } = body;
  if (!userId || !email) return error(400, 'Missing userId or email');

  try {
    const existing = await docClient.send(new GetCommand({ TableName: USERS_TABLE, Key: { userId } }));
    if (existing.Item) return success({ user: existing.Item, synced: false });

    const newUser = { userId, email, displayName: displayName || email.split('@')[0], status: 'online', createdAt: new Date().toISOString() };
    await docClient.send(new PutCommand({ TableName: USERS_TABLE, Item: newUser, ConditionExpression: 'attribute_not_exists(userId)' }));
    console.log(`User ${userId} (${email}) synced to DynamoDB`);
    return success({ user: newUser, synced: true });
  } catch (err) {
    if (err.name === 'ConditionalCheckFailedException') {
      const existing = await docClient.send(new GetCommand({ TableName: USERS_TABLE, Key: { userId } }));
      return success({ user: existing.Item, synced: false });
    }
    console.error('SyncUser error:', err);
    return error(500, 'Failed to sync user');
  }
};
