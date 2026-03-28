/**
 * QuickChat — User Purge Script
 * 
 * Usage: node purge-user.mjs <userId>
 * 
 * This script completely removes a user's footprint from:
 * 1. Cognito User Pool
 * 2. DynamoDB Users table
 * 3. DynamoDB Conversations table (removes both sides of the chat)
 * 4. DynamoDB Connections table
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import fs from 'fs';
import path from 'path';

// Load .env manually for simplicity
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length === 2) {
        process.env[parts[0].trim()] = parts[1].trim();
      }
    });
  }
}

loadEnv();

const userId = process.argv[2];
if (!userId) {
  console.error("❌ Error: Missing userId argument.");
  console.log("Usage: node purge-user.mjs <userId>");
  process.exit(1);
}

// Configuration (Update based on your AWS setup or let env handle it)
const REGION = process.env.AWS_REGION || "us-east-1";
const TABLES = {
  USERS: "QuickChat-Users",
  CONVERSATIONS: "QuickChat-Conversations",
  CONNECTIONS: "QuickChat-Connections"
};
const USER_POOL_ID = process.env.VITE_COGNITO_USER_POOL_ID;

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);
const cognito = new CognitoIdentityProviderClient({ region: REGION });

async function purge() {
  console.log(`\n🚀 Starting full purge for user: ${userId}`);
  console.log(`📍 Region: ${REGION}`);

  // 1. Delete from Cognito
  if (USER_POOL_ID) {
    try {
      await cognito.send(new AdminDeleteUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: userId
      }));
      console.log("✅ Deleted from Cognito");
    } catch (e) {
      console.warn("⚠️ Cognito delete skipped:", e.message);
    }
  } else {
    console.log("ℹ️ No User Pool ID found in .env, skipping Cognito delete.");
  }

  // 2. Delete from Users Table
  try {
    await docClient.send(new DeleteCommand({
      TableName: TABLES.USERS,
      Key: { userId }
    }));
    console.log("✅ Deleted from Users table");
  } catch (e) {
    console.warn("⚠️ Users table delete skipped:", e.message);
  }

  // 3. Purge Conversations
  try {
    const convs = await docClient.send(new QueryCommand({
      TableName: TABLES.CONVERSATIONS,
      IndexName: "UserConversationsIndex",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId }
    }));

    if (convs.Items && convs.Items.length > 0) {
      console.log(`🔍 Found ${convs.Items.length} conversation records. Cleaning up both sides...`);
      for (const conv of convs.Items) {
        const { conversationId, otherUserId, participants } = conv;
        const recipientId = otherUserId || (participants && participants.find(p => p !== userId));

        // Delete user's view
        await docClient.send(new DeleteCommand({
          TableName: TABLES.CONVERSATIONS,
          Key: { conversationId, userId }
        }));

        // Delete other user's view to completely vanish the chat
        if (recipientId) {
          await docClient.send(new DeleteCommand({
            TableName: TABLES.CONVERSATIONS,
            Key: { conversationId, userId: recipientId }
          }));
          console.log(`   🗑️ Removed conversation ${conversationId.slice(0, 8)}... for both users`);
        }
      }
    } else {
      console.log("ℹ️ No conversations found for this user.");
    }
  } catch (e) {
    console.error("❌ Error purging conversations:", e.message);
  }

  // 4. Clear WebSocket Connections
  try {
    const conns = await docClient.send(new QueryCommand({
      TableName: TABLES.CONNECTIONS,
      IndexName: "UserConnectionIndex",
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId }
    }));

    if (conns.Items && conns.Items.length > 0) {
      for (const conn of conns.Items) {
        await docClient.send(new DeleteCommand({
          TableName: TABLES.CONNECTIONS,
          Key: { connectionId: conn.connectionId }
        }));
      }
      console.log(`✅ Cleared ${conns.Items.length} active connections`);
    }
  } catch (e) {
    console.warn("⚠️ Connection clear skipped:", e.message);
  }

  console.log("\n✨ Purge complete. The user and their chats have been fully erased.\n");
}

purge().catch(console.error);
