import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

// Table names from environment variables
export const TABLES = {
  USERS: process.env.USERS_TABLE || 'QuickChat-Users',
  CONVERSATIONS: process.env.CONVERSATIONS_TABLE || 'QuickChat-Conversations',
  MESSAGES: process.env.MESSAGES_TABLE || 'QuickChat-Messages',
  CONNECTIONS: process.env.CONNECTIONS_TABLE || 'QuickChat-Connections',
};
