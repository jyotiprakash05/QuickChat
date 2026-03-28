import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { success, error } from './shared/response.mjs';
import { v4 as uuidv4 } from 'uuid';

export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return error(400, 'Invalid JSON body');
  }

  const { userId, recipientId } = body;

  if (!userId || !recipientId) {
    return error(400, 'Missing userId or recipientId');
  }

  if (userId === recipientId) {
    return error(400, 'Cannot create conversation with yourself');
  }

  try {
    // Check if a conversation already exists between these two users
    const existingConvs = await docClient.send(new QueryCommand({
      TableName: TABLES.CONVERSATIONS,
      IndexName: 'UserConversationsIndex',
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: { ':uid': userId },
    }));

    // Look for a conversation where the other participant is recipientId
    const existing = (existingConvs.Items || []).find(c =>
      c.participants && c.participants.includes(recipientId)
    );

    if (existing) {
      return success({ conversation: existing, existing: true });
    }

    // Create new conversation
    const conversationId = uuidv4();
    const now = new Date().toISOString();

    // Create conversation entry for user 1
    await docClient.send(new PutCommand({
      TableName: TABLES.CONVERSATIONS,
      Item: {
        conversationId,
        userId,
        participants: [userId, recipientId],
        otherUserId: recipientId,
        otherDisplayName: body.recipientName || 'User',
        lastMessage: '',
        lastMessageAt: now,
        createdAt: now,
      },
    }));

    // Create conversation entry for user 2
    await docClient.send(new PutCommand({
      TableName: TABLES.CONVERSATIONS,
      Item: {
        conversationId,
        userId: recipientId,
        participants: [userId, recipientId],
        otherUserId: userId,
        otherDisplayName: body.senderName || 'User',
        lastMessage: '',
        lastMessageAt: now,
        createdAt: now,
      },
    }));

    const conversation = {
      conversationId,
      userId,
      participants: [userId, recipientId],
      otherUserId: recipientId,
      otherDisplayName: body.recipientName || 'User',
      lastMessage: '',
      lastMessageAt: now,
      createdAt: now,
    };

    return success({ conversation, existing: false });
  } catch (err) {
    console.error('CreateConversation error:', err);
    return error(500, 'Failed to create conversation');
  }
};

