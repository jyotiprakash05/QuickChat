import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './shared/dynamodb.mjs';

export const handler = async (event) => {
  // Only run on confirmed sign-up (not forgot password, etc.)
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    return event;
  }

  const userId = event.request.userAttributes.sub;
  const email = event.request.userAttributes.email;
  const displayName = event.request.userAttributes.name || email.split('@')[0];

  try {
    await docClient.send(new PutCommand({
      TableName: TABLES.USERS,
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
    // Don't throw — that would block the sign-up
  }

  return event;
};

