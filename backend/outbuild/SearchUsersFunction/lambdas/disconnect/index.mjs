import { DeleteCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from '../../shared/dynamodb.mjs';
import { wsSuccess, wsError } from '../../shared/response.mjs';

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;

  try {
    // Find the user associated with this connection
    const scanResult = await docClient.send(new ScanCommand({
      TableName: TABLES.CONNECTIONS,
      FilterExpression: 'connectionId = :cid',
      ExpressionAttributeValues: { ':cid': connectionId },
    }));

    const connection = scanResult.Items?.[0];

    // Remove connection record
    await docClient.send(new DeleteCommand({
      TableName: TABLES.CONNECTIONS,
      Key: { connectionId },
    }));

    // Update user status to offline if found
    if (connection?.userId) {
      await docClient.send(new UpdateCommand({
        TableName: TABLES.USERS,
        Key: { userId: connection.userId },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':status': 'offline' },
      }));
      console.log(`User ${connection.userId} disconnected`);
    }

    return wsSuccess();
  } catch (err) {
    console.error('Disconnect error:', err);
    return wsError(500, 'Failed to disconnect');
  }
};
