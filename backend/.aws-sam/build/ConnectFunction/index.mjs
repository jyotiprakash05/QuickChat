import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { wsSuccess, wsError } from './shared/response.mjs';

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const userId = event.queryStringParameters?.userId;

  if (!userId) {
    return wsError(400, 'Missing userId query parameter');
  }

  try {
    // Store connection
    await docClient.send(new PutCommand({
      TableName: TABLES.CONNECTIONS,
      Item: {
        connectionId,
        userId,
        connectedAt: new Date().toISOString(),
      },
    }));

    // Update user status to online
    await docClient.send(new UpdateCommand({
      TableName: TABLES.USERS,
      Key: { userId },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: { '#status': 'status' },
      ExpressionAttributeValues: { ':status': 'online' },
    }));

    console.log(`User ${userId} connected with connectionId ${connectionId}`);
    return wsSuccess();
  } catch (err) {
    console.error('Connect error:', err);
    return wsError(500, 'Failed to connect');
  }
};

