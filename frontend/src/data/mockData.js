// Realistic mock data for QuickChat demo mode

export const CURRENT_USER = {
  userId: 'user-001',
  email: 'alex.morgan@email.com',
  displayName: 'Alex Morgan',
  avatarUrl: null,
  status: 'online',
  createdAt: '2024-01-15T10:00:00Z',
};

export const MOCK_USERS = [
  {
    userId: 'user-002',
    displayName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    avatarUrl: null,
    status: 'online',
  },
  {
    userId: 'user-003',
    displayName: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    avatarUrl: null,
    status: 'offline',
  },
  {
    userId: 'user-004',
    displayName: 'Priya Patel',
    email: 'priya.p@email.com',
    avatarUrl: null,
    status: 'online',
  },
  {
    userId: 'user-005',
    displayName: 'David Kim',
    email: 'david.kim@email.com',
    avatarUrl: null,
    status: 'away',
  },
  {
    userId: 'user-006',
    displayName: 'Emma Wilson',
    email: 'emma.w@email.com',
    avatarUrl: null,
    status: 'online',
  },
  {
    userId: 'user-007',
    displayName: 'James Liu',
    email: 'james.liu@email.com',
    avatarUrl: null,
    status: 'offline',
  },
  {
    userId: 'user-008',
    displayName: 'Olivia Martinez',
    email: 'olivia.m@email.com',
    avatarUrl: null,
    status: 'online',
  },
];

export const MOCK_CONVERSATIONS = [
  {
    conversationId: 'conv-001',
    participants: ['user-001', 'user-002'],
    lastMessage: 'Sounds great! Let me check the deployment pipeline 🚀',
    lastMessageAt: new Date(Date.now() - 2 * 60000).toISOString(),
    unreadCount: 2,
  },
  {
    conversationId: 'conv-002',
    participants: ['user-001', 'user-003'],
    lastMessage: "I'll send the design files by end of day.",
    lastMessageAt: new Date(Date.now() - 15 * 60000).toISOString(),
    unreadCount: 0,
  },
  {
    conversationId: 'conv-003',
    participants: ['user-001', 'user-004'],
    lastMessage: 'The new feature is looking amazing! Great work on the animations.',
    lastMessageAt: new Date(Date.now() - 45 * 60000).toISOString(),
    unreadCount: 1,
  },
  {
    conversationId: 'conv-004',
    participants: ['user-001', 'user-005'],
    lastMessage: 'Can we schedule a code review for tomorrow morning?',
    lastMessageAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    unreadCount: 0,
  },
  {
    conversationId: 'conv-005',
    participants: ['user-001', 'user-006'],
    lastMessage: 'Absolutely! The API integration tests are all passing now ✅',
    lastMessageAt: new Date(Date.now() - 8 * 3600000).toISOString(),
    unreadCount: 3,
  },
  {
    conversationId: 'conv-006',
    participants: ['user-001', 'user-007'],
    lastMessage: 'Thanks for the feedback on the PR!',
    lastMessageAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    unreadCount: 0,
  },
  {
    conversationId: 'conv-007',
    participants: ['user-001', 'user-008'],
    lastMessage: "Let's sync up about the database migration plan.",
    lastMessageAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    unreadCount: 0,
  },
];

export const MOCK_MESSAGES = {
  'conv-001': [
    {
      messageId: 'msg-001',
      conversationId: 'conv-001',
      senderId: 'user-002',
      content: 'Hey Alex! How is the QuickChat project going?',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-002',
      conversationId: 'conv-001',
      senderId: 'user-001',
      content: "Going really well! Just finished the auth module and WebSocket integration. The real-time messaging is super smooth now.",
      timestamp: new Date(Date.now() - 28 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-003',
      conversationId: 'conv-001',
      senderId: 'user-002',
      content: "That's awesome! What stack are you using for the backend?",
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-004',
      conversationId: 'conv-001',
      senderId: 'user-001',
      content: "Fully serverless on AWS — Lambda for compute, DynamoDB for storage, API Gateway WebSocket for real-time, and Cognito for auth. It's pretty elegant actually.",
      timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-005',
      conversationId: 'conv-001',
      senderId: 'user-002',
      content: "Nice! Serverless is the way to go. We should deploy it on Amplify for hosting too. Have you set up the CI/CD pipeline?",
      timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-006',
      conversationId: 'conv-001',
      senderId: 'user-001',
      content: "Not yet, but the amplify.yml is ready. Want to pair on the deployment setup this afternoon?",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-007',
      conversationId: 'conv-001',
      senderId: 'user-002',
      content: 'Sounds great! Let me check the deployment pipeline 🚀',
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      type: 'text',
    },
  ],
  'conv-002': [
    {
      messageId: 'msg-010',
      conversationId: 'conv-002',
      senderId: 'user-001',
      content: 'Hey Marcus, do you have the updated mockups for the profile page?',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-011',
      conversationId: 'conv-002',
      senderId: 'user-003',
      content: "Working on them right now! Added some nice hover animations and glass morphism effects.",
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-012',
      conversationId: 'conv-002',
      senderId: 'user-001',
      content: 'Love it! Make sure the dark mode looks sharp with those effects.',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-013',
      conversationId: 'conv-002',
      senderId: 'user-003',
      content: "I'll send the design files by end of day.",
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      type: 'text',
    },
  ],
  'conv-003': [
    {
      messageId: 'msg-020',
      conversationId: 'conv-003',
      senderId: 'user-004',
      content: 'Just pushed the animation code for the message bubbles!',
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-021',
      conversationId: 'conv-003',
      senderId: 'user-001',
      content: 'Let me pull and check it out. The slide-up effect sounds cool.',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-022',
      conversationId: 'conv-003',
      senderId: 'user-004',
      content: 'The new feature is looking amazing! Great work on the animations.',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      type: 'text',
    },
  ],
  'conv-004': [
    {
      messageId: 'msg-030',
      conversationId: 'conv-004',
      senderId: 'user-005',
      content: 'Can we schedule a code review for tomorrow morning?',
      timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
      type: 'text',
    },
  ],
  'conv-005': [
    {
      messageId: 'msg-040',
      conversationId: 'conv-005',
      senderId: 'user-006',
      content: 'The API integration is done. All 15 test cases pass! 🎉',
      timestamp: new Date(Date.now() - 10 * 3600000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-041',
      conversationId: 'conv-005',
      senderId: 'user-001',
      content: 'Amazing work Emma! Did you run the load tests too?',
      timestamp: new Date(Date.now() - 9 * 3600000).toISOString(),
      type: 'text',
    },
    {
      messageId: 'msg-042',
      conversationId: 'conv-005',
      senderId: 'user-006',
      content: 'Absolutely! The API integration tests are all passing now ✅',
      timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
      type: 'text',
    },
  ],
  'conv-006': [
    {
      messageId: 'msg-050',
      conversationId: 'conv-006',
      senderId: 'user-007',
      content: 'Thanks for the feedback on the PR!',
      timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
      type: 'text',
    },
  ],
  'conv-007': [
    {
      messageId: 'msg-060',
      conversationId: 'conv-007',
      senderId: 'user-008',
      content: "Let's sync up about the database migration plan.",
      timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
      type: 'text',
    },
  ],
};

export function getOtherUser(conversation, currentUserId) {
  const otherId = conversation.participants.find((id) => id !== currentUserId);
  return MOCK_USERS.find((u) => u.userId === otherId) || { displayName: 'Unknown', status: 'offline' };
}
