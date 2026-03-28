import { PutCommand, QueryCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import { docClient, TABLES } from '../../shared/dynamodb.mjs';
import { wsSuccess, wsError } from '../../shared/response.mjs';
import { v4 as uuidv4 } from 'uuid';

export const handler = async (event) => {
  const { domainName, stage, connectionId } = event.requestContext;

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return wsError(400, 'Invalid JSON');
  }

  const { conversationId, senderId, content, recipientId } = body;

  if (!conversationId || !senderId || !content) {
    return wsError(400, 'Missing required fields: conversationId, senderId, content');
  }

  const messageId = uuidv4();
  const timestamp = new Date().toISOString();

  try {
    // Store message in DynamoDB
    await docClient.send(new PutCommand({
      TableName: TABLES.MESSAGES,
      Item: {
        conversationId,
        messageId,
        senderId,
        content,
        timestamp,
        type: 'text',
      },
    }));

    // Update conversation's last message for sender
    await docClient.send(new UpdateCommand({
      TableName: TABLES.CONVERSATIONS,
      Key: { conversationId, userId: senderId },
      UpdateExpression: 'SET lastMessage = :msg, lastMessageAt = :ts',
      ExpressionAttributeValues: {
        ':msg': content.substring(0, 100),
        ':ts': timestamp,
      },
    }));

    if (recipientId) {
      // Update conversation's last message for recipient
      await docClient.send(new UpdateCommand({
        TableName: TABLES.CONVERSATIONS,
        Key: { conversationId, userId: recipientId },
        UpdateExpression: 'SET lastMessage = :msg, lastMessageAt = :ts',
        ExpressionAttributeValues: {
          ':msg': content.substring(0, 100),
          ':ts': timestamp,
        },
      }));

      // Find recipient's active connections
      const connectionsResult = await docClient.send(new QueryCommand({
        TableName: TABLES.CONNECTIONS,
        IndexName: 'UserConnectionIndex',
        KeyConditionExpression: 'userId = :uid',
        ExpressionAttributeValues: { ':uid': recipientId },
      }));

      // Push message to recipient's WebSocket connections
      const apiClient = new ApiGatewayManagementApiClient({
        endpoint: `https://${domainName}/${stage}`,
      });

      const messagePayload = JSON.stringify({
        action: 'newMessage',
        message: { messageId, conversationId, senderId, content, timestamp, type: 'text' },
      });

      const sendPromises = (connectionsResult.Items || []).map(async (conn) => {
        try {
          await apiClient.send(new PostToConnectionCommand({
            ConnectionId: conn.connectionId,
            Data: messagePayload,
          }));
        } catch (err) {
          if (err.statusCode === 410 || err.name === 'GoneException') {
            // Stale connection — clean up
            await docClient.send(new DeleteCommand({
              TableName: TABLES.CONNECTIONS,
              Key: { connectionId: conn.connectionId },
            }));
          } else {
            console.error(`Failed to send to ${conn.connectionId}:`, err);
          }
        }
      });

      await Promise.all(sendPromises);
    }

    console.log(`Message ${messageId} sent in conversation ${conversationId}`);
    return wsSuccess();
  } catch (err) {
    console.error('SendMessage error:', err);
    return wsError(500, 'Failed to send message');
  }
};
