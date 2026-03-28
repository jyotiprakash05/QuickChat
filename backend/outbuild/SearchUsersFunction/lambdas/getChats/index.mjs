import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from '../../shared/dynamodb.mjs';
import { success, error } from '../../shared/response.mjs';

export const handler = async (event) => {
  const userId = event.queryStringParameters?.userId;

  if (!userId) {
    return error(400, 'Missing userId query parameter');
  }

  try {
    // Query conversations where user is a participant using GSI
    const result = await docClient.send(new QueryCommand({
      TableName: TABLES.CONVERSATIONS,
      IndexName: 'UserConversationsIndex',
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: { ':uid': userId },
      ScanIndexForward: false, // newest first
    }));

    return success({
      conversations: result.Items || [],
    });
  } catch (err) {
    console.error('GetChats error:', err);
    return error(500, 'Failed to get conversations');
  }
};
