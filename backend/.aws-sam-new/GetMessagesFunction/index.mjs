import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { success, error } from './shared/response.mjs';

export const handler = async (event) => {
  const conversationId = event.queryStringParameters?.conversationId;
  const limit = parseInt(event.queryStringParameters?.limit || '50', 10);
  const lastKey = event.queryStringParameters?.lastKey;

  if (!conversationId) {
    return error(400, 'Missing conversationId query parameter');
  }

  try {
    const params = {
      TableName: TABLES.MESSAGES,
      KeyConditionExpression: 'conversationId = :cid',
      ExpressionAttributeValues: { ':cid': conversationId },
      ScanIndexForward: true, // oldest first
      Limit: limit,
    };

    if (lastKey) {
      params.ExclusiveStartKey = JSON.parse(Buffer.from(lastKey, 'base64').toString());
    }

    const result = await docClient.send(new QueryCommand(params));

    return success({
      messages: result.Items || [],
      lastKey: result.LastEvaluatedKey
        ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64')
        : null,
    });
  } catch (err) {
    console.error('GetMessages error:', err);
    return error(500, 'Failed to get messages');
  }
};

