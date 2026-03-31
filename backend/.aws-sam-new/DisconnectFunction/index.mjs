import { DeleteCommand, ScanCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { wsSuccess, wsError } from './shared/response.mjs';

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

      // Broadcast status to all people who have a chat with this user
      try {
        const userId = connection.userId;
        const convsResult = await docClient.send(new QueryCommand({
          TableName: TABLES.CONVERSATIONS,
          KeyConditionExpression: 'userId = :uid',
          ExpressionAttributeValues: { ':uid': userId },
        }));

        const apiClient = new ApiGatewayManagementApiClient({
          endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
        });

        const statusPayload = JSON.stringify({
          action: 'userStatus',
          status: { userId, status: 'offline' }
        });

        for (const conv of (convsResult.Items || [])) {
          const otherUserId = conv.otherUserId;
          if (!otherUserId) continue;

          const connections = await docClient.send(new QueryCommand({
            TableName: TABLES.CONNECTIONS,
            IndexName: 'UserConnectionIndex',
            KeyConditionExpression: 'userId = :uid',
            ExpressionAttributeValues: { ':uid': otherUserId },
          }));

          const sendPromises = (connections.Items || []).map(async (conn) => {
            try {
              await apiClient.send(new PostToConnectionCommand({
                ConnectionId: conn.connectionId,
                Data: statusPayload,
              }));
            } catch (e) {
              if (e.statusCode === 410 || e.name === 'GoneException') {
                await docClient.send(new DeleteCommand({ TableName: TABLES.CONNECTIONS, Key: { connectionId: conn.connectionId } }));
              }
            }
          });
          await Promise.all(sendPromises);
        }
      } catch (broadcastErr) {
        console.warn('Failed to broadcast offline status:', broadcastErr);
      }
    }

    return wsSuccess();
  } catch (err) {
    console.error('Disconnect error:', err);
    return wsError(500, 'Failed to disconnect');
  }
};

