import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from '../../shared/dynamodb.mjs';
import { success, error } from '../../shared/response.mjs';

/**
 * SyncUser Lambda — called by the frontend after every successful login.
 * Ensures the user exists in DynamoDB even if the PostConfirmation trigger
 * failed or was not attached when the user originally signed up.
 *
 * This uses a conditional PutItem (attribute_not_exists) so it only creates
 * a new record if one doesn't already exist — it won't overwrite existing
 * user data (display name changes, avatar, etc.).
 */
export const handler = async (event) => {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return error(400, 'Invalid JSON body');
  }

  const { userId, email, displayName } = body;

  if (!userId || !email) {
    return error(400, 'Missing userId or email');
  }

  try {
    // First check if user already exists
    const existing = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { userId },
    }));

    if (existing.Item) {
      // User already exists in DynamoDB — return their current data
      return success({ user: existing.Item, synced: false });
    }

    // User does NOT exist in DynamoDB — create the record
    const newUser = {
      userId,
      email,
      displayName: displayName || email.split('@')[0],
      status: 'online',
      createdAt: new Date().toISOString(),
    };

    await docClient.send(new PutCommand({
      TableName: TABLES.USERS,
      Item: newUser,
      ConditionExpression: 'attribute_not_exists(userId)', // safety net for race conditions
    }));

    console.log(`User ${userId} (${email}) synced to DynamoDB`);
    return success({ user: newUser, synced: true });
  } catch (err) {
    // ConditionalCheckFailedException means user was created between our Get and Put
    if (err.name === 'ConditionalCheckFailedException') {
      const existing = await docClient.send(new GetCommand({
        TableName: TABLES.USERS,
        Key: { userId },
      }));
      return success({ user: existing.Item, synced: false });
    }

    console.error('SyncUser error:', err);
    return error(500, 'Failed to sync user');
  }
};
