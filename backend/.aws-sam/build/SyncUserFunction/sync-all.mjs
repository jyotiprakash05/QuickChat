import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const REGION = 'ap-south-1';
const USER_POOL_ID = 'ap-south-1_uj1gasnQh';
const USERS_TABLE = 'quickchat-v2-UsersTable-XV3YRALEX3LX';

async function syncAllUsers() {
    console.log('Starting sync...');
    const cognito = new CognitoIdentityProviderClient({ region: REGION });
    const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

    try {
        const command = new ListUsersCommand({ UserPoolId: USER_POOL_ID });
        const response = await cognito.send(command);
        const users = response.Users || [];
        
        console.log(`Found ${users.length} users in Cognito.`);

        for (const user of users) {
            const emailAttr = user.Attributes.find(a => a.Name === 'email');
            const subAttr = user.Attributes.find(a => a.Name === 'sub');
            
            if (!emailAttr || !subAttr) continue;
            
            const username = emailAttr.Value.split('@')[0];
            
            await dynamodb.send(new PutCommand({
                TableName: USERS_TABLE,
                Item: {
                    userId: subAttr.Value,
                    email: emailAttr.Value,
                    username: username,
                    createdAt: user.UserCreateDate.toISOString(),
                    status: 'online' // Let's set to online so they show up easily
                }
            }));
            console.log(`Synced user: ${emailAttr.Value}`);
        }
        console.log('Sync complete!');
    } catch (err) {
        console.error('Error syncing:', err);
    }
}

syncAllUsers();
