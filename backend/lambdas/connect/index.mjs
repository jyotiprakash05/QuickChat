import { PutCommand, UpdateCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
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

    // Broadcast status to all people who have a chat with this user
    try {
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
        status: { userId, status: 'online' }
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
      console.warn('Failed to broadcast online status:', broadcastErr);
    }

    return wsSuccess();
  } catch (err) {
    console.error('Connect error:', err);
    return wsError(500, 'Failed to connect');
  }
};

