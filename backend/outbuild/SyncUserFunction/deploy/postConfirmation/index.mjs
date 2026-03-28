// ============================================
// QuickChat-PostConfirmation — Standalone Lambda
// Paste this ENTIRE file into the AWS Lambda Console code editor
// ============================================

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const docClient = DynamoDBDocumentClient.from(client, { marshallOptions: { removeUndefinedValues: true } });
const USERS_TABLE = process.env.USERS_TABLE || 'QuickChat-Users';

export const handler = async (event) => {
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    return event;
  }
  const userId = event.request.userAttributes.sub;
  const email = event.request.userAttributes.email;
  const displayName = event.request.userAttributes.name || email.split('@')[0];

  try {
    await docClient.send(new PutCommand({
      TableName: USERS_TABLE,
      Item: {
        userId,
        email,
        displayName,
        status: 'offline',
        createdAt: new Date().toISOString(),
      },
    }));
    console.log(`User ${userId} (${email}) saved to DynamoDB`);
  } catch (err) {
    console.error('PostConfirmation error:', err);
  }
  return event;
};
