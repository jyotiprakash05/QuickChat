import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { success, error } from './shared/response.mjs';

export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return error(400, 'Invalid JSON body');
  }

  const { userId, displayName, avatarUrl } = body;

  if (!userId) {
    return error(400, 'Missing userId');
  }

  const updateExpressions = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  if (displayName !== undefined) {
    updateExpressions.push('#dn = :dn');
    expressionAttributeNames['#dn'] = 'displayName';
    expressionAttributeValues[':dn'] = displayName;
  }

  if (avatarUrl !== undefined) {
    updateExpressions.push('avatarUrl = :av');
    expressionAttributeValues[':av'] = avatarUrl;
  }

  if (updateExpressions.length === 0) {
    return error(400, 'No fields to update');
  }

  try {
    const result = await docClient.send(new UpdateCommand({
      TableName: TABLES.USERS,
      Key: { userId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }));

    return success({ user: result.Attributes });
  } catch (err) {
    console.error('UpdateProfile error:', err);
    return error(500, 'Failed to update profile');
  }
};

