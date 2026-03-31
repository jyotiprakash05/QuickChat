import { QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { wsSuccess, wsError } from './shared/response.mjs';

export const handler = async (event) => {
  const { domainName, stage, connectionId } = event.requestContext;

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return wsError(400, 'Invalid JSON');
  }

  const { conversationId, senderId, recipientId, isTyping } = body;

  if (!conversationId || !senderId || !recipientId) {
    return wsError(400, 'Missing required fields: conversationId, senderId, recipientId');
  }

  try {
    // Find recipient's active connections
    const connectionsResult = await docClient.send(new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      IndexName: 'UserConnectionIndex',
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: { ':uid': recipientId },
    }));

    const apiClient = new ApiGatewayManagementApiClient({
      endpoint: `https://${domainName}/${stage}`,
    });

    const payload = JSON.stringify({
      action: 'typing',
      typing: { conversationId, userId: senderId, isTyping }
    });

    const sendPromises = (connectionsResult.Items || []).map(async (conn) => {
      // Don't send back to the same connection
      if (conn.connectionId === connectionId) return;
      
      try {
        await apiClient.send(new PostToConnectionCommand({
          ConnectionId: conn.connectionId,
          Data: payload,
        }));
      } catch (err) {
        if (err.statusCode === 410 || err.name === 'GoneException') {
          await docClient.send(new DeleteCommand({
            TableName: TABLES.CONNECTIONS,
            Key: { connectionId: conn.connectionId },
          }));
        }
      }
    });

    await Promise.all(sendPromises);
    return wsSuccess();
  } catch (err) {
    console.error('Typing error:', err);
    return wsError(500, 'Failed to broadcast typing signal');
  }
};
