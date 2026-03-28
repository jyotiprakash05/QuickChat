// ============================================
// QuickChat-GetStats — Standalone Lambda
// Paste this ENTIRE file into the AWS Lambda Console code editor
// ============================================

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });
const USERS_TABLE = process.env.USERS_TABLE || 'QuickChat-Users';

function success(body = {}) {
  return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type,Authorization', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' }, body: JSON.stringify(body) };
}
function error(statusCode = 500, message = 'Internal Server Error') {
  return { statusCode, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: message }) };
}

export const handler = async () => {
  try {
    const result = await docClient.send(new ScanCommand({
      TableName: USERS_TABLE,
      Select: 'COUNT',
    }));
    return success({
      totalUsers: result.Count || 0,
      scannedCount: result.ScannedCount || 0,
    });
  } catch (err) {
    console.error('GetStats error:', err);
    return error(500, 'Failed to get stats');
  }
};
