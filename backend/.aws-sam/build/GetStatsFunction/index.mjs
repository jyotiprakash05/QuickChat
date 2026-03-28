import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './shared/dynamodb.mjs';
import { success, error } from './shared/response.mjs';

export const handler = async () => {
  try {
    // Count users without fetching full items (cost-efficient)
    const result = await docClient.send(new ScanCommand({
      TableName: TABLES.USERS,
      Select: 'COUNT',
    }));

    return success({
      totalUsers: result.Count || 0,
      scannedCount: result.ScannedCount || 0,
    });
  } catch (err) {
    console.error('GetStats error:', err);
    return error(500, 'Failed to get stats');
  }
};

