// ============================================
// QuickChat — Main Application (AWS-Integrated)
// ============================================

// --- SVG Icons ---
const ICONS = {
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>',
  smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
  paperclip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',
  checkcheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-9.5 9.5L10 17"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  wifiOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
};

// --- Utilities ---
function getInitials(n) { return n ? n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) : '?'; }
function formatTime(d) { const t=new Date(d); let h=t.getHours(),m=t.getMinutes(),a=h>=12?'PM':'AM'; h=h%12||12; return `${h}:${m.toString().padStart(2,'0')} ${a}`; }
function formatChatTime(d) { const t=new Date(d),n=new Date(); if(t.toDateString()===n.toDateString()) return formatTime(d); const y=new Date(n); y.setDate(y.getDate()-1); if(t.toDateString()===y.toDateString()) return 'Yesterday'; return t.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }
function formatDateLabel(d) { return new Date(d).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}); }
function generateId() { return Date.now().toString(36)+Math.random().toString(36).slice(2); }
function escapeHtml(s) { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function getAvatarGradient(n) { let h=0; for(let i=0;i<(n||'').length;i++) h=n.charCodeAt(i)+((h<<5)-h); return `avatar--gradient-${(Math.abs(h)%8)+1}`; }

// --- Theme Init ---
const savedTheme = localStorage.getItem('qc_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// --- State ---
let state = {
  currentUser: null,
  conversations: [],
  messages: {},
  activeConversationId: null,
  typingUsers: {},
  view: 'landing',
  authTab: 'login',
  authStep: 'form',
  pendingEmail: '',
  searchQuery: '',
  isLive: false,
  wsConnected: false,
  totalUsers: null,  // total registered users from DynamoDB
  meTyping: false,
  // Voice recording state
  isRecording: false,
  mediaRecorder: null,
  audioChunks: [],
  recordingStartTime: null,
  recordingTimer: null,
};

const app = document.getElementById('app');

// --- Presigned URL Cache (for S3 voice messages) ---
const presignedUrlCache = {}; // { s3Key: { url, expiresAt } }

function extractS3Key(url) {
  if (!url || typeof url !== 'string') return null;
  // Match: https://BUCKET.s3.amazonaws.com/KEY or https://BUCKET.s3.REGION.amazonaws.com/KEY
  const match = url.match(/\.s3(?:\.[\w-]+)?\.amazonaws\.com\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function resolveVoiceUrl(url) {
  // blob: URLs or data: URLs are already playable (local recordings)
  if (!url || url.startsWith('blob:') || url.startsWith('data:')) return url;
  
  const key = extractS3Key(url);
  if (!key) return url; // Not an S3 URL, return as-is
  
  // Check cache (with 5-min buffer before expiry)
  const cached = presignedUrlCache[key];
  if (cached && cached.expiresAt > Date.now() + 300000) return cached.url;
  
  try {
    const data = await ApiService.getDownloadUrl(key);
    presignedUrlCache[key] = { url: data.downloadUrl, expiresAt: Date.now() + 3600000 }; // 1hr
    return data.downloadUrl;
  } catch (err) {
    console.error('Failed to get presigned URL:', err);
    return url; // Fallback to original URL
  }
}

// --- Initialize ---
async function boot() {
  const cognitoReady = AuthService.init();
  state.isLive = CONFIG.IS_LIVE && cognitoReady;

  if (state.isLive) {
    try {
      const userData = await AuthService.restoreSession();
      state.currentUser = { userId: userData.userId, email: userData.email, displayName: userData.displayName, status: 'online' };
      state.view = 'chat';
      render();
      // Sync user to DynamoDB (ensures they exist even if PostConfirmation trigger failed)
      try { await ApiService.syncUser(userData.userId, userData.email, userData.displayName); } catch (e) { console.warn('syncUser on restore:', e); }
      await loadChats();
      connectWebSocket();
      return;
    } catch (_) { /* no stored session */ }
  }
  render();
}

async function loadChats() {
  if (!state.isLive || !state.currentUser) return;
  try {
    const data = await ApiService.getChats(state.currentUser.userId);
    state.conversations = (data.conversations || []).sort((a,b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
    renderSidebar();
    
    // Reconcile and auto-fix the "User" name bug for old chats by fetching true display names
    try {
      const usersData = await ApiService.searchUsers(state.currentUser.userId, '');
      const usersMap = {};
      (usersData.users || []).forEach(u => usersMap[u.userId] = u);
      
      let updated = false;
      state.conversations.forEach(c => {
        const oid = c.otherUserId || (c.participants && c.participants.find(p => p !== state.currentUser.userId));
        if (oid && usersMap[oid]) {
          const fetchedName = usersMap[oid].displayName || (usersMap[oid].email ? usersMap[oid].email.split('@')[0] : (oid.substring(0,6) || 'User'));
          if (c.otherDisplayName === 'User' || c.otherDisplayName !== fetchedName) {
            c.otherDisplayName = fetchedName;
            c.otherStatus = usersMap[oid].status;
            updated = true;
          }
        }
      });
      if (updated) renderSidebar();
    } catch(e) { console.warn('Silent name sync failed:', e); }

  } catch (e) { console.error('loadChats:', e); }
}

async function loadStats() {
  if (!state.isLive) return;
  try {
    const data = await ApiService.getStats();
    state.totalUsers = data.totalUsers ?? null;
    // Refresh just the badge if sidebar is visible
    const badge = document.getElementById('user-count-badge');
    if (badge) badge.textContent = `👥 ${state.totalUsers} users on QuickChat`;
  } catch (e) { console.error('loadStats:', e); }
}

async function loadMessages(convId) {
  if (!state.isLive) return;
  try {
    const data = await ApiService.getMessages(convId);
    state.messages[convId] = (data.messages || []).map(msg => {
      // Detect voice messages: check type OR fallback to URL pattern
      const isVoice = msg.type === 'voice' || 
        (typeof msg.content === 'string' && msg.content.match(/\.(webm|ogg|mp3|m4a|wav)(\?.*)?$/i));
      if (isVoice) {
        msg.type = 'voice';
        if (!msg.voiceUrl) msg.voiceUrl = msg.content;
      }
      return msg;
    }).sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    // Resolve presigned URLs for all voice messages
    const voiceMsgs = state.messages[convId].filter(m => m.type === 'voice' && m.voiceUrl);
    await Promise.all(voiceMsgs.map(async (msg) => {
      msg.voiceUrl = await resolveVoiceUrl(msg.voiceUrl);
    }));
  } catch (e) { console.error('loadMessages:', e); }
}

function connectWebSocket() {
  if (!state.isLive || !state.currentUser) return;
  WsService.connect(state.currentUser.userId);
  WsService.on('connected', () => { state.wsConnected = true; updateConnectionBadge(); });
  WsService.on('disconnected', () => { state.wsConnected = false; updateConnectionBadge(); });
  
  WsService.on('newMessage', async (msg) => {
    if (!state.messages[msg.conversationId]) state.messages[msg.conversationId] = [];
    
    // Detect voice messages: check type OR fallback to URL pattern
    const isVoice = msg.type === 'voice' || 
      (typeof msg.content === 'string' && msg.content.match(/\.(webm|ogg|mp3|m4a|wav)(\?.*)?$/i));
    if (isVoice) {
      msg.type = 'voice';
      if (!msg.voiceUrl) msg.voiceUrl = msg.content;
      // Resolve presigned URL for the receiver
      msg.voiceUrl = await resolveVoiceUrl(msg.voiceUrl);
    }
    
    // Find if this is an update for one of OUR pending messages
    if (msg.senderId === state.currentUser?.userId) {
      const pendingIdx = state.messages[msg.conversationId].findIndex(m => m.isPending && (
        m.content === msg.content || (m.type === 'voice' && msg.type === 'voice')
      ));
      if (pendingIdx !== -1) {
        // Keep local blob URL for sender (already playable), but update other fields
        const localVoiceUrl = state.messages[msg.conversationId][pendingIdx].voiceUrl;
        state.messages[msg.conversationId][pendingIdx] = msg;
        if (isVoice && localVoiceUrl && localVoiceUrl.startsWith('blob:')) {
          state.messages[msg.conversationId][pendingIdx].voiceUrl = localVoiceUrl;
        }
      } else {
        if (!state.messages[msg.conversationId].find(m => m.messageId === msg.messageId)) {
          state.messages[msg.conversationId].push(msg);
        }
      }
    } else {
      if (!state.messages[msg.conversationId].find(m => m.messageId === msg.messageId)) {
        state.messages[msg.conversationId].push(msg);
      }
    }
    
    state.messages[msg.conversationId].sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));

    let conv = state.conversations.find(c => (c.conversationId||c.id) === msg.conversationId);
    if (!conv) {
      if (state.isLive) {
        // Fetch the conversation list to get this new conversation
        await loadChats();
        conv = state.conversations.find(c => (c.conversationId||c.id) === msg.conversationId);
      } else {
        // Fallback for demo mode
        conv = { conversationId: msg.conversationId, otherDisplayName: 'New User', lastMessage: '', lastMessageAt: msg.timestamp, unreadCount: 0 };
        state.conversations.unshift(conv);
      }
    }
    
    if (conv) { 
      conv.lastMessage = msg.type === 'voice' ? '🎙️ Voice message' : msg.content; 
      conv.lastMessageAt = msg.timestamp; 
      if (state.activeConversationId !== msg.conversationId) conv.unreadCount = (conv.unreadCount||0)+1; 
    }
    
    state.conversations.sort((a,b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
    if (state.activeConversationId === msg.conversationId) renderChatWindow();
    renderSidebar();
  });

  WsService.on('typing', (data) => {
    if (!state.typingUsers[data.conversationId]) state.typingUsers[data.conversationId] = {};
    state.typingUsers[data.conversationId][data.userId] = data.isTyping;
    if (state.activeConversationId === data.conversationId) renderTypingIndicator();
    renderSidebar(); // Update sidebar to show "typing..."
  });

  WsService.on('messageDeleted', (data) => {
    if (state.messages[data.conversationId]) {
      state.messages[data.conversationId] = state.messages[data.conversationId].filter(m => m.messageId !== data.messageId);
      if (state.activeConversationId === data.conversationId) renderChatWindow();
      // Update last message if needed
      const conv = state.conversations.find(c => c.conversationId === data.conversationId);
      if (conv && state.messages[data.conversationId].length > 0) {
        const last = state.messages[data.conversationId][state.messages[data.conversationId].length - 1];
        conv.lastMessage = last.content;
        conv.lastMessageAt = last.timestamp;
      } else if (conv) {
        conv.lastMessage = 'Message deleted';
      }
      renderSidebar();
    }
  });

  WsService.on('userStatus', (data) => {
    state.conversations.forEach(c => { 
      const otherId = c.otherUserId || (c.participants && c.participants.find(p => p !== state.currentUser.userId));
      if (otherId === data.userId) c.otherStatus = data.status; 
    });
    const conv = state.conversations.find(c => (c.conversationId||c.id) === state.activeConversationId);
    const otherId = conv?.otherUserId || (conv?.participants && conv?.participants.find(p => p !== state.currentUser.userId));
    if (otherId === data.userId) {
      const el = document.querySelector('.chat-header__status');
      if (el) { 
        el.textContent = data.status==='online' ? 'Online' : 'Offline'; 
        el.className = `chat-header__status chat-header__status--${data.status}`; 
      }
    }
    renderSidebar();
  });
}

function renderTypingIndicator() {
  const container = document.getElementById('typing-indicator-container');
  if (!container) return;
  const currentTyping = state.typingUsers[state.activeConversationId] || {};
  const isSomeoneTyping = Object.values(currentTyping).some(v => v);
  if (isSomeoneTyping) {
    container.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div><span class="typing-text">typing...</span>`;
    container.classList.add('visible');
  } else {
    container.innerHTML = '';
    container.classList.remove('visible');
  }
}

function updateConnectionBadge() {
  const dot = document.getElementById('ws-status-dot');
  if (dot) dot.className = state.wsConnected ? 'sidebar-brand__dot sidebar-brand__dot--online' : 'sidebar-brand__dot sidebar-brand__dot--offline';
}

function render() {
  if (state.view === 'landing') renderLandingPage();
  else if (state.view === 'auth') renderAuth();
  else renderChatPage();
}

// --- Navigation & History ---
async function navigate(view, push = true, params = {}) {
  // Save specific states
  if (params.activeConversationId !== undefined) {
    state.activeConversationId = params.activeConversationId;
    if (state.activeConversationId) {
      const conv = state.conversations.find(c => (c.conversationId||c.id) === state.activeConversationId);
      if (conv) conv.unreadCount = 0;
      if (state.isLive && (!state.messages[state.activeConversationId] || !state.messages[state.activeConversationId].length)) {
        await loadMessages(state.activeConversationId);
      }
    }
  }
  
  state.view = view;
  
  if (push) {
    const historyState = { 
      view: state.view, 
      activeConversationId: state.activeConversationId 
    };
    history.pushState(historyState, '');
  }
  
  render();
}

window.onpopstate = (event) => {
  if (event.state) {
    state.view = event.state.view;
    state.activeConversationId = event.state.activeConversationId;
    render();
  } else {
    // Default to initial state
    state.view = 'landing';
    state.activeConversationId = null;
    render();
  }
};

async function deleteMessage(conversationId, messageId) {
  if (!state.isLive) {
    // Demo mode delete
    if (state.messages[conversationId]) {
      state.messages[conversationId] = state.messages[conversationId].filter(m => m.messageId !== messageId);
      renderChatWindow();
    }
    return;
  }
  
  const conv = state.conversations.find(c => c.conversationId === conversationId);
  const otherId = conv?.otherUserId || (conv?.participants && conv?.participants.find(p => p !== state.currentUser.userId));
  
  // Update local state immediately
  state.messages[conversationId] = state.messages[conversationId].filter(m => m.messageId !== messageId);
  renderChatWindow();
  
  // Call service
  WsService.deleteMessage(conversationId, messageId, state.currentUser.userId, otherId);
}

// ======================== VOICE RECORDING ========================
function formatRecordingTime(ms) {
  const secs = Math.floor(ms / 1000);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.audioChunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
    state.mediaRecorder = new MediaRecorder(stream, { mimeType });
    
    state.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) state.audioChunks.push(e.data);
    };
    
    state.mediaRecorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
    };
    
    state.mediaRecorder.start(100); // collect in 100ms chunks for responsiveness
    state.isRecording = true;
    state.recordingStartTime = Date.now();
    
    // Update timer display
    state.recordingTimer = setInterval(() => {
      const el = document.getElementById('recording-timer');
      if (el) el.textContent = formatRecordingTime(Date.now() - state.recordingStartTime);
    }, 200);
    
    renderMessageInput();
  } catch (err) {
    console.error('Microphone access denied:', err);
    alert('Please allow microphone access to send voice messages.');
  }
}

function cancelRecording() {
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    state.mediaRecorder.stop();
  }
  clearInterval(state.recordingTimer);
  state.isRecording = false;
  state.audioChunks = [];
  state.mediaRecorder = null;
  state.recordingStartTime = null;
  renderMessageInput();
}

async function stopAndSendRecording() {
  if (!state.mediaRecorder || state.mediaRecorder.state === 'inactive') return;
  
  return new Promise((resolve) => {
    state.mediaRecorder.onstop = async () => {
      state.mediaRecorder.stream?.getTracks().forEach(t => t.stop());
      clearInterval(state.recordingTimer);
      state.isRecording = false;
      
      const blob = new Blob(state.audioChunks, { type: 'audio/webm' });
      const duration = Math.floor((Date.now() - state.recordingStartTime) / 1000);
      state.audioChunks = [];
      state.recordingStartTime = null;
      
      // Show sending state
      renderMessageInput();
      
      await sendVoiceMessage(blob, duration);
      resolve();
    };
    state.mediaRecorder.stop();
  });
}

async function sendVoiceMessage(blob, duration) {
  const convId = state.activeConversationId;
  const conv = state.conversations.find(c => (c.conversationId||c.id) === convId);
  const other = getConvUser(conv);
  
  // Create a local URL for immediate playback
  const localUrl = URL.createObjectURL(blob);
  
  const newMsg = {
    messageId: generateId(),
    conversationId: convId,
    senderId: state.currentUser.userId,
    content: '🎙️ Voice message',
    timestamp: new Date().toISOString(),
    type: 'voice',
    voiceUrl: localUrl,
    voiceDuration: duration,
    isPending: true,
  };
  
  if (!state.messages[convId]) state.messages[convId] = [];
  state.messages[convId].push(newMsg);
  
  const c = state.conversations.find(x => (x.conversationId||x.id) === convId);
  if (c) { c.lastMessage = '🎙️ Voice message'; c.lastMessageAt = newMsg.timestamp; }
  state.conversations.sort((a,b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
  
  renderChatWindow();
  renderSidebar();
  
  // Upload to S3 if live
  if (state.isLive) {
    try {
      const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
      const { fileUrl } = await ApiService.uploadFile(file);
      
      // Send via WebSocket with the S3 URL
      const recipientId = other.userId || '';
      WsService.send('sendMessage', {
        conversationId: convId,
        senderId: state.currentUser.userId,
        content: fileUrl,
        recipientId,
        type: 'voice',
        voiceDuration: duration,
      });
    } catch (err) {
      console.error('Voice upload failed:', err);
    }
  }
}

function togglePlayVoice(messageId) {
  const audio = document.getElementById(`audio-${messageId}`);
  const btn = document.getElementById(`play-btn-${messageId}`);
  const progress = document.getElementById(`voice-progress-${messageId}`);
  if (!audio) return;
  
  // Pause all other playing audios
  document.querySelectorAll('.voice-audio').forEach(a => {
    if (a.id !== `audio-${messageId}` && !a.paused) {
      a.pause();
      a.currentTime = 0;
      const otherId = a.id.replace('audio-', '');
      const otherBtn = document.getElementById(`play-btn-${otherId}`);
      if (otherBtn) otherBtn.innerHTML = ICONS.play;
      const otherProg = document.getElementById(`voice-progress-${otherId}`);
      if (otherProg) otherProg.style.width = '0%';
    }
  });
  
  if (audio.paused) {
    audio.play();
    if (btn) btn.innerHTML = ICONS.pause;
    
    audio.ontimeupdate = () => {
      if (progress && audio.duration) {
        progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }
    };
    audio.onended = () => {
      if (btn) btn.innerHTML = ICONS.play;
      if (progress) progress.style.width = '0%';
    };
  } else {
    audio.pause();
    if (btn) btn.innerHTML = ICONS.play;
  }
}

// ======================== LANDING PAGE ========================
function renderLandingPage() {
  app.innerHTML = `
    <div class="landing-page">
      <nav class="landing-nav">
        <div class="landing-nav__brand">
          <div class="auth-hero__icon" style="width:40px;height:40px">${ICONS.chat}</div>
          <span style="font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">QuickChat</span>
        </div>
        <div class="landing-nav__links">
          <button class="btn-ghost" id="btn-landing-login" style="margin-right: 12px; font-weight: 600;">Log In</button>
          <button class="btn-primary" id="btn-landing-signup" style="padding: 10px 24px; width:auto; border-radius: 9999px;">Get Started Free</button>
        </div>
      </nav>
      
      <main class="landing-main">
        <section class="landing-hero">
          <div class="landing-hero__content">
            <div class="badge-pill" style="margin: 0 auto 24px; display: inline-flex;">✨ The new standard for communication</div>
            <h1 class="landing-title">Professional team communication, <span class="auth-hero__highlight">simplified.</span></h1>
            <p class="landing-subtitle">QuickChat brings your team together in one highly secure, lightning-fast workspace. Built for modern professionals who demand excellence.</p>
            <div class="landing-hero__actions">
              <button class="btn-primary" id="btn-hero-cta" style="padding: 16px 32px; font-size: 16px; border-radius: 9999px; width: auto;">Start Chatting Now</button>
              <button class="btn-secondary" id="btn-hero-demo" style="padding: 16px 32px; font-size: 16px; border-radius: 9999px; width: auto; background: var(--surface-light); color: var(--text-primary);">View Platform</button>
            </div>
          </div>
        </section>

        <section class="landing-features">
          <h2 class="landing-features__title">Everything you need to collaborate</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-card__icon">${ICONS.wifi}</div>
              <h3 class="feature-card__title">Real-Time Sync</h3>
              <p class="feature-card__text">Experience zero-latency messaging powered by cutting-edge WebSocket infrastructure.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">${ICONS.shield}</div>
              <h3 class="feature-card__title">Enterprise Security</h3>
              <p class="feature-card__text">Your data is secured in transit and at rest using top-tier AWS Cognito standards.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">${ICONS.moon}</div>
              <h3 class="feature-card__title">Premium Design</h3>
              <p class="feature-card__text">A gorgeous interface with seamless Light & Dark modes to reduce eye strain.</p>
            </div>
          </div>
        </section>
      </main>

      <footer class="landing-footer">
        <p>© ${new Date().getFullYear()} QuickChat Professional. All rights reserved.</p>
      </footer>
    </div>
  `;

  document.getElementById('btn-landing-login').onclick = () => { state.authTab='login'; state.authStep='form'; navigate('auth'); };
  document.getElementById('btn-landing-signup').onclick = () => { state.authTab='signup'; state.authStep='form'; navigate('auth'); };
  document.getElementById('btn-hero-cta').onclick = () => { state.authTab='signup'; state.authStep='form'; navigate('auth'); };
  document.getElementById('btn-hero-demo').onclick = () => { state.authTab='login'; state.authStep='form'; navigate('auth'); };
}

// ======================== AUTH ========================
function renderAuth() {
  const isLogin = state.authTab === 'login';
  app.innerHTML = `
    <div class="auth-page">
      <div class="auth-split">
        <div class="auth-split__left">
          <div class="auth-hero__logo">
            <div class="auth-hero__icon">${ICONS.chat}</div>
            <h1 class="auth-hero__title">QuickChat</h1>
          </div>
          <div class="auth-hero__text-group">
            <p class="auth-hero__subtitle">Real-time messaging built for</p>
            <h2 class="auth-hero__highlight">Modern Humans.</h2>
          </div>
          <div class="auth-features">
            <div class="auth-feature-item"><span class="feature-icon">⚡</span> Lightning fast real-time sync</div>
            <div class="auth-feature-item"><span class="feature-icon">🔒</span> Secure cloud infrastructure</div>
            <div class="auth-feature-item"><span class="feature-icon">🎨</span> Gorgeous, fluid user interface</div>
          </div>
          <div style="margin-top: auto; padding-top: 40px;">
            ${state.isLive ? '<span class="live-badge">● Live Production Environment</span>' : '<span class="demo-badge">Demo Mode</span>'}
          </div>
        </div>
        
        <div class="auth-split__right">
          <div class="auth-container">
            <div class="glass-card auth-card">
              <div class="auth-tabs">
                <button class="auth-tab ${isLogin?'auth-tab--active':''}" id="tab-login">Sign In</button>
                <button class="auth-tab ${!isLogin?'auth-tab--active':''}" id="tab-signup">Sign Up</button>
              </div>
              <div id="auth-form-area"></div>
            </div>
            <p class="auth-footer">© 2024 QuickChat. Humanizing connections.</p>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('tab-login').onclick = () => { state.authTab='login'; state.authStep='form'; renderAuth(); };
  document.getElementById('tab-signup').onclick = () => { state.authTab='signup'; state.authStep='form'; renderAuth(); };
  if (state.authStep === 'confirm') renderConfirmForm();
  else if (isLogin) renderLoginForm();
  else renderSignupForm();
}

function renderLoginForm() {
  const area = document.getElementById('auth-form-area');
  area.innerHTML = `
    <form id="login-form">
      <div id="login-error"></div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-wrapper">
          <span class="input-icon">${ICONS.mail}</span>
          <input class="input-field" type="email" id="login-email" placeholder="you@example.com" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-wrapper">
          <span class="input-icon">${ICONS.lock}</span>
          <input class="input-field" type="password" id="login-password" placeholder="Enter your password" required style="padding-right:44px">
          <button type="button" class="input-toggle" id="login-toggle-pw">${ICONS.eye}</button>
        </div>
      </div>
      <div class="form-extras">
        <label><input type="checkbox"> Remember me</label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" class="btn-primary" id="login-submit">Sign In</button>
      ${!state.isLive ? '<p class="form-hint">Demo mode: Enter any email and password</p>' : ''}
    </form>`;

  const pwInput = document.getElementById('login-password');
  document.getElementById('login-toggle-pw').onclick = () => {
    const show = pwInput.type==='password'; pwInput.type=show?'text':'password';
    document.getElementById('login-toggle-pw').innerHTML = show ? ICONS.eyeOff : ICONS.eye;
  };

  document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (!email||!password) { showError('login-error','Please enter email and password'); return; }
    const btn = document.getElementById('login-submit');
    btn.innerHTML = '<span class="spinner"></span> Signing in...'; btn.disabled = true;

    if (state.isLive) {
      try {
        const userData = await AuthService.signIn(email, password);
        state.currentUser = { userId: userData.userId, email: userData.email, displayName: userData.displayName, status: 'online' };
        // Sync user to DynamoDB (ensures they exist even if PostConfirmation trigger failed)
        try { await ApiService.syncUser(userData.userId, userData.email, userData.displayName); } catch (e) { console.warn('syncUser on login:', e); }
        state.view = 'chat'; navigate('chat'); await loadChats(); loadStats(); connectWebSocket();
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
          state.pendingEmail = email; state.authStep = 'confirm'; renderAuth();
        } else {
          showError('login-error', err.message || 'Login failed'); btn.innerHTML='Sign In'; btn.disabled=false;
        }
      }
    } else {
      setTimeout(() => {
        state.view = 'chat'; navigate('chat');
      }, 600);
    }
  };
}

function renderSignupForm() {
  const area = document.getElementById('auth-form-area');
  area.innerHTML = `
    <form id="signup-form">
      <div id="signup-error"></div>
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <div class="input-wrapper"><span class="input-icon">${ICONS.user}</span><input class="input-field" type="text" id="signup-name" placeholder="John Doe" required></div>
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-wrapper"><span class="input-icon">${ICONS.mail}</span><input class="input-field" type="email" id="signup-email" placeholder="you@example.com" required></div>
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <div class="input-wrapper"><span class="input-icon">${ICONS.phone}</span><input class="input-field" type="tel" id="signup-phone" placeholder="+1234567890 (include + and country code)" required></div>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-wrapper"><span class="input-icon">${ICONS.lock}</span><input class="input-field" type="password" id="signup-password" placeholder="Min. 8 characters" required style="padding-right:44px">
          <button type="button" class="input-toggle" id="signup-toggle-pw">${ICONS.eye}</button></div>
      </div>
      <div class="form-group">
        <label class="form-label">Confirm Password</label>
        <div class="input-wrapper"><span class="input-icon">${ICONS.lock}</span><input class="input-field" type="password" id="signup-confirm" placeholder="Repeat your password" required></div>
      </div>
      <button type="submit" class="btn-primary" id="signup-submit">Create Account</button>
      ${!state.isLive ? '<p class="form-hint">Demo mode: fills mock data</p>' : '<p class="form-hint">You\'ll receive an SMS verification code</p>'}
    </form>`;

  const pwInput = document.getElementById('signup-password');
  document.getElementById('signup-toggle-pw').onclick = () => { const s=pwInput.type==='password'; pwInput.type=s?'text':'password'; document.getElementById('signup-toggle-pw').innerHTML=s?ICONS.eyeOff:ICONS.eye; };

  document.getElementById('signup-form').onsubmit = async (e) => {
    e.preventDefault();
    const name=document.getElementById('signup-name').value, email=document.getElementById('signup-email').value;
    const phone=document.getElementById('signup-phone').value;
    const pw=document.getElementById('signup-password').value, confirm=document.getElementById('signup-confirm').value;
    if (!name||!email||!pw||!phone) { showError('signup-error','Please fill in all fields'); return; }
    if (pw!==confirm) { showError('signup-error','Passwords do not match'); return; }
    if (!phone.startsWith('+')) { showError('signup-error','Phone number must start with + and country code (e.g. +91...)'); return; }
    const btn=document.getElementById('signup-submit'); btn.innerHTML='<span class="spinner"></span> Creating...'; btn.disabled=true;

    if (state.isLive) {
      try {
        const result = await AuthService.signUp(name, email, phone, pw);
        state.pendingEmail = email; 
        state.deliveryDestination = result?.codeDeliveryDetails?.Destination || phone;
        state.authStep = 'confirm'; renderAuth();
      } catch (err) { showError('signup-error', err.message||'Sign up failed'); btn.innerHTML='Create Account'; btn.disabled=false; }
    } else {
      setTimeout(() => {
        state.view='chat'; navigate('chat');
      }, 800);
    }
  };
}

function renderConfirmForm() {
  const area = document.getElementById('auth-form-area');
  const displayDest = state.deliveryDestination || state.pendingEmail;
  area.innerHTML = `
    <form id="confirm-form">
      <div id="confirm-error"></div>
      <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px;text-align:center">We sent a verification code to <strong>${escapeHtml(displayDest)}</strong></p>
      <div class="form-group">
        <label class="form-label">Verification Code</label>
        <div class="input-wrapper"><span class="input-icon">${ICONS.shield}</span><input class="input-field" type="text" id="confirm-code" placeholder="123456" required autocomplete="one-time-code" maxlength="6" style="letter-spacing:8px;text-align:center;font-size:20px;font-weight:700"></div>
      </div>
      <button type="submit" class="btn-primary" id="confirm-submit">Verify Account</button>
      <p class="form-hint" style="margin-top:12px">Didn't get the code? <a href="#" id="resend-code" style="color:var(--electric)">Resend</a></p>
    </form>`;

  document.getElementById('confirm-form').onsubmit = async (e) => {
    e.preventDefault();
    const code=document.getElementById('confirm-code').value.trim();
    if (!code) { showError('confirm-error','Enter the 6-digit code'); return; }
    const btn=document.getElementById('confirm-submit'); btn.innerHTML='<span class="spinner"></span> Verifying...'; btn.disabled=true;
    try {
      await AuthService.confirmSignUp(state.pendingEmail, code);
      state.authStep='form'; state.authTab='login'; renderAuth();
      setTimeout(() => showError('login-error','<div style="background:rgba(52,211,153,0.1);border-color:rgba(52,211,153,0.2);color:var(--emerald)" class="auth-error">Account verified! Please sign in.</div>',true), 50);
    } catch (err) { showError('confirm-error',err.message||'Invalid code'); btn.innerHTML='Verify Account'; btn.disabled=false; }
  };

  document.getElementById('resend-code').onclick = async (e) => {
    e.preventDefault();
    try { await AuthService.resendConfirmation(state.pendingEmail); showError('confirm-error','<div style="background:rgba(52,211,153,0.1);border-color:rgba(52,211,153,0.2);color:var(--emerald)" class="auth-error">Code resent!</div>',true); } catch(err) { showError('confirm-error',err.message); }
  };
}

function showError(id, msg, raw=false) {
  const el=document.getElementById(id);
  if (el) el.innerHTML = raw ? msg : `<div class="auth-error">${escapeHtml(msg)}</div>`;
}

// ======================== CHAT PAGE ========================
function renderChatPage() {
  app.innerHTML = `<div class="chat-page"><div class="sidebar" id="sidebar"></div><div class="chat-main" id="chat-main"></div></div>`;
  const sb = document.getElementById('sidebar');
  if (state.activeConversationId || state.view === 'profile') {
    sb.classList.add('sidebar--hidden');
  } else {
    sb.classList.remove('sidebar--hidden');
  }
  renderSidebar(); renderMainArea();
}

function getConvUser(conv) {
  // Live mode: conv has participants array or otherUser fields
  if (conv.otherDisplayName) return { displayName: conv.otherDisplayName, status: conv.otherStatus||'offline', userId: conv.otherUserId||'' };
  if (conv.participants) {
    const otherId = conv.participants.find(id => id !== state.currentUser.userId);
    return { displayName: otherId || 'User', status: 'online', userId: otherId||'' };
  }
  return { displayName: conv.conversationId||'Chat', status: 'offline', userId: '' };
}

function renderSidebar() {
  const sb = document.getElementById('sidebar'); if (!sb) return;
  const user = state.currentUser;
  const filtered = state.searchQuery
    ? state.conversations.filter(c => { const o=getConvUser(c); return o.displayName.toLowerCase().includes(state.searchQuery.toLowerCase()) || (c.lastMessage||'').toLowerCase().includes(state.searchQuery.toLowerCase()); })
    : state.conversations;

  let convListHtml = '';
  if (!filtered.length) { convListHtml = `<div class="no-results">${state.searchQuery?'No conversations found':'No chats yet — start a new one!'}</div>`; }
  else {
    convListHtml = filtered.map(conv => {
      const other = getConvUser(conv);
      const cid = conv.conversationId || conv.id;
      const isActive = state.activeConversationId === cid;
      const grad = getAvatarGradient(other.displayName);
      const currentTyping = state.typingUsers[cid] || {};
      const isTyping = Object.values(currentTyping).some(v => v);
      // Show '🎙️ Voice message' for voice messages instead of raw S3 URL
      let rawPreview = conv.lastMessage || '';
      if (!isTyping && rawPreview && extractS3Key(rawPreview)) rawPreview = '🎙️ Voice message';
      const previewText = isTyping ? `<span class="typing-preview">typing...</span>` : escapeHtml(rawPreview);
      return `
        <div class="conv-item ${isActive?'conv-item--active':''}" data-conv-id="${cid}">
          <div class="conv-item__avatar">
            <div class="avatar avatar--md ${grad}">${getInitials(other.displayName)}</div>
            <div class="status-dot status-dot--${other.status}"></div>
          </div>
          <div class="conv-item__info">
            <div class="conv-item__top">
              <span class="conv-item__name">${escapeHtml(other.displayName)}</span>
              <span class="conv-item__time">${conv.lastMessageAt?formatChatTime(conv.lastMessageAt):''}</span>
            </div>
            <p class="conv-item__preview">${previewText}</p>
          </div>
          ${(conv.unreadCount||0)>0 ? `<span class="conv-item__badge">${conv.unreadCount}</span>` : ''}
        </div>`;
    }).join('');
  }

  sb.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <div class="sidebar-brand__icon">${ICONS.chat}</div>
          <span class="sidebar-brand__name">QuickChat</span>
          <div class="sidebar-brand__dot ${state.wsConnected?'sidebar-brand__dot--online':'sidebar-brand__dot--offline'}" id="ws-status-dot" title="${state.wsConnected?'Connected':'Disconnected'}"></div>
        </div>
        <div class="sidebar-actions">
          <button class="icon-btn" id="btn-new-chat" title="New chat">${ICONS.plus}</button>
          <button class="icon-btn" id="btn-open-settings" title="Settings">${ICONS.settings}</button>
        </div>
      </div>
      <div class="search-box">
        <span class="search-box__icon">${ICONS.search}</span>
        <input class="search-box__input" id="search-input" type="text" placeholder="Search conversations..." value="${escapeHtml(state.searchQuery)}">
      </div>
    </div>
    ${state.isLive && state.totalUsers !== null
      ? `<div class="user-count-badge" id="user-count-badge">👥 ${state.totalUsers} users on QuickChat</div>`
      : ''}
    <div class="conv-list scrollbar-hide" id="conv-list">${convListHtml}</div>
    <div class="sidebar-footer">
      <div class="sidebar-user" id="sidebar-user-btn">
        <div class="avatar avatar--sm avatar--gradient-8">${getInitials(user.displayName)}</div>
        <div class="sidebar-user__info">
          <p class="sidebar-user__name">${escapeHtml(user.displayName)}</p>
          <p class="sidebar-user__status"><span class="sidebar-user__status-dot"></span> ${state.isLive?'Live':'Demo'}</p>
        </div>
      </div>
    </div>`;

  document.getElementById('search-input').oninput = (e) => { state.searchQuery=e.target.value; renderSidebar(); };
  document.querySelectorAll('.conv-item').forEach(el => {
    el.onclick = async () => {
      const cid = el.dataset.convId;
      navigate('chat', true, { activeConversationId: cid });
    };
  });
  document.getElementById('btn-new-chat').onclick = () => openNewChatModal();
  document.getElementById('btn-open-settings').onclick = () => { navigate('profile'); };
  document.getElementById('sidebar-user-btn').onclick = () => { navigate('profile'); };
}

function renderMainArea() {
  if (state.view==='profile') { renderProfilePage(); return; }
  if (!state.activeConversationId) { renderEmptyState(); return; }
  renderChatWindow();
}

function renderEmptyState() {
  document.getElementById('chat-main').innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon">${ICONS.chat}</div>
      <h3 class="empty-state__title">Welcome to QuickChat</h3>
      <p class="empty-state__text">Select a conversation to start chatting${state.isLive?' in real-time':' (demo mode)'}</p>
    </div>`;
}

function renderChatWindow() {
  const main = document.getElementById('chat-main');
  const cid = state.activeConversationId;
  const conv = state.conversations.find(c => (c.conversationId||c.id) === cid);
  if (!conv) { renderEmptyState(); return; }
  const other = getConvUser(conv);
  const msgs = state.messages[cid] || [];
  const grad = getAvatarGradient(other.displayName);

  let msgsHtml='', lastDate=null;
  msgs.forEach(msg => {
    const msgDate = new Date(msg.timestamp).toDateString();
    if (msgDate!==lastDate) { msgsHtml += `<div class="date-separator"><div class="date-separator__line"></div><span class="date-separator__text">${formatDateLabel(msg.timestamp)}</span><div class="date-separator__line"></div></div>`; lastDate=msgDate; }
    const isSent = msg.senderId === state.currentUser.userId;
    const isVoice = msg.type === 'voice';
    
    let bubbleContent;
    if (isVoice) {
      const voiceUrl = msg.voiceUrl || msg.content;
      const duration = msg.voiceDuration || 0;
      const durationStr = `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;
      bubbleContent = `
        <div class="voice-message">
          <audio id="audio-${msg.messageId}" class="voice-audio" src="${voiceUrl}" preload="metadata"></audio>
          <button class="voice-play-btn" id="play-btn-${msg.messageId}" onclick="togglePlayVoice('${msg.messageId}')">
            ${ICONS.play}
          </button>
          <div class="voice-waveform">
            <div class="voice-waveform__bars">
              ${Array.from({length: 28}, () => `<div class="voice-bar" style="height:${Math.floor(Math.random()*80+20)}%"></div>`).join('')}
            </div>
            <div class="voice-progress" id="voice-progress-${msg.messageId}"></div>
          </div>
          <span class="voice-duration">${durationStr}</span>
        </div>`;
    } else {
      bubbleContent = `<p class="message-text">${escapeHtml(msg.content)}</p>`;
    }
    
    msgsHtml += `
      <div class="message-row ${isSent?'message-row--sent':'message-row--received'}" id="msg-${msg.messageId}">
        <div class="message-bubble ${isSent?'message-bubble--sent':'message-bubble--received'} ${isVoice?'message-bubble--voice':''}">
          <div class="message-bubble__content">
            ${bubbleContent}
            ${(isSent && !msg.isPending) ? `<button class="message-delete-btn" title="Delete message" onclick="deleteMessage('${msg.conversationId}', '${msg.messageId}')">${ICONS.trash}</button>` : ''}
          </div>
          <div class="message-meta">
            <span class="message-time">${formatTime(msg.timestamp)}</span>
            ${isSent ? `<span class="message-check">${ICONS.checkcheck}</span>` : ''}
          </div>
        </div>
      </div>`;
  });

  main.innerHTML = `
    <div class="chat-header">
      <div class="chat-header__left">
        <button class="chat-header__back icon-btn" id="btn-chat-back">${ICONS.back}</button>
        <div class="avatar avatar--sm ${grad}">${getInitials(other.displayName)}</div>
        <div>
          <div class="chat-header__name">${escapeHtml(other.displayName)}</div>
          <div class="chat-header__status chat-header__status--${other.status}">${other.status==='online'?'Online':'Offline'}</div>
        </div>
      </div>
      <div class="chat-header__actions">
        <button class="icon-btn">${ICONS.more}</button>
      </div>
    </div>
    <div class="messages-area scrollbar-hide" id="messages-area">
      ${msgsHtml}
      <div id="typing-indicator-container" class="typing-container"></div>
    </div>
    <div class="message-input-area" id="message-input-area">
    </div>`;

  renderMessageInput();

  const area = document.getElementById('messages-area');
  area.scrollTop = area.scrollHeight;
  renderTypingIndicator();

  document.getElementById('btn-chat-back').onclick = () => { navigate('chat', true, { activeConversationId: null }); };

  bindMessageInputEvents();
}

function renderMessageInput() {
  const container = document.getElementById('message-input-area');
  if (!container) return;
  
  if (state.isRecording) {
    container.innerHTML = `
      <div class="voice-recording-bar">
        <button class="voice-cancel-btn" id="btn-cancel-recording" title="Cancel">${ICONS.trash}</button>
        <div class="voice-recording-info">
          <div class="voice-recording-pulse"></div>
          <span class="voice-recording-timer" id="recording-timer">0:00</span>
          <div class="voice-recording-wave">
            ${Array.from({length: 20}, () => '<span></span>').join('')}
          </div>
        </div>
        <button class="voice-send-btn" id="btn-send-recording" title="Send">${ICONS.send}</button>
      </div>`;
    
    document.getElementById('btn-cancel-recording').onclick = cancelRecording;
    document.getElementById('btn-send-recording').onclick = stopAndSendRecording;
  } else {
    container.innerHTML = `
      <div class="message-input-row">
        <textarea class="message-textarea" id="msg-input" rows="1" placeholder="Type a message..."></textarea>
        <button class="icon-btn voice-mic-btn" id="btn-mic" title="Voice message">${ICONS.mic}</button>
        <button class="send-btn send-btn--disabled" id="btn-send">${ICONS.send}</button>
      </div>`;
    
    bindMessageInputEvents();
  }
}

function bindMessageInputEvents() {
  const input = document.getElementById('msg-input');
  const sendBtn = document.getElementById('btn-send');
  const micBtn = document.getElementById('btn-mic');
  if (!input || !sendBtn) return;
  
  function updateSendBtn() {
    if (input.value.trim()) {
      sendBtn.className = 'send-btn send-btn--active';
      sendBtn.style.display = '';
      if (micBtn) micBtn.style.display = 'none';
    } else {
      sendBtn.className = 'send-btn send-btn--disabled';
      sendBtn.style.display = 'none';
      if (micBtn) micBtn.style.display = '';
    }
  }
  updateSendBtn();
  
  let typingTimeout;
  input.oninput = () => { 
    input.style.height='auto'; 
    input.style.height=Math.min(input.scrollHeight,120)+'px'; 
    updateSendBtn();
    
    // Typing indicator signal
    if (state.isLive && state.activeConversationId) {
      const conv = state.conversations.find(c => (c.conversationId||c.id) === state.activeConversationId);
      const otherId = conv?.otherUserId || (conv?.participants && conv?.participants.find(p => p !== state.currentUser.userId));
      if (otherId) {
        if (!state.meTyping) {
          state.meTyping = true;
          WsService.sendTyping(state.activeConversationId, state.currentUser.userId, otherId, true);
        }
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          state.meTyping = false;
          WsService.sendTyping(state.activeConversationId, state.currentUser.userId, otherId, false);
        }, 3000);
      }
    }
  };

  const cid = state.activeConversationId;
  const conv = state.conversations.find(c => (c.conversationId||c.id) === cid);
  const other = conv ? getConvUser(conv) : { userId: '' };

  function doSend() {
    const text = input.value.trim(); if (!text) return;
    const convId = state.activeConversationId;
    const newMsg = { 
      messageId:generateId(), 
      conversationId:convId, 
      senderId:state.currentUser.userId, 
      content:text, 
      timestamp:new Date().toISOString(), 
      type:'text',
      isPending: true 
    };
    if (!state.messages[convId]) state.messages[convId] = [];
    state.messages[convId].push(newMsg);
    const c = state.conversations.find(x => (x.conversationId||x.id) === convId);
    if (c) { c.lastMessage=text; c.lastMessageAt=newMsg.timestamp; }
    state.conversations.sort((a,b) => new Date(b.lastMessageAt)-new Date(a.lastMessageAt));
    input.value=''; input.style.height='auto'; updateSendBtn();
    renderChatWindow(); renderSidebar();
    if (state.isLive) {
      const recipientId = other.userId || '';
      WsService.sendMessage(convId, state.currentUser.userId, text, recipientId);
    }
  }

  sendBtn.onclick = doSend;
  input.onkeydown = (e) => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doSend();} };
  if (micBtn) micBtn.onclick = startRecording;
  input.focus();
}

// ======================== PROFILE PAGE ========================
function renderProfilePage() {
  const main = document.getElementById('chat-main');
  const user = state.currentUser;
  const grad = getAvatarGradient(user.displayName);
  main.innerHTML = `
    <div class="profile-page">
      <div class="profile-header">
        <button class="icon-btn" id="btn-profile-back">${ICONS.back}</button>
        <h2 class="profile-header__title">Profile & Settings</h2>
      </div>
      <div class="profile-body scrollbar-hide">
        <div class="profile-avatar-section">
          <div class="profile-avatar-wrapper">
            <div class="avatar avatar--xl ${grad}">${getInitials(user.displayName)}</div>
            <button class="profile-avatar-btn">${ICONS.camera}</button>
          </div>
          <h3 class="profile-name" id="profile-display-name">${escapeHtml(user.displayName)}</h3>
          <p class="profile-email">${escapeHtml(user.email)}</p>
          <div id="profile-save-msg"></div>
        </div>
        <div class="profile-section">
          <div class="profile-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <h4 class="profile-section-title" style="margin-bottom:0">Profile Information</h4>
              <button class="profile-edit-btn" id="btn-edit-profile">Edit</button>
            </div>
            <div class="profile-field"><span class="profile-field__icon">${ICONS.user}</span><div class="profile-field__content"><p class="profile-field__label">Display Name</p><p class="profile-field__value" id="field-name-display">${escapeHtml(user.displayName)}</p></div></div>
            <div class="profile-field"><span class="profile-field__icon">${ICONS.mail}</span><div class="profile-field__content"><p class="profile-field__label">Email</p><p class="profile-field__value">${escapeHtml(user.email)}</p></div></div>
            <div class="profile-field"><span class="profile-field__icon">${state.wsConnected?ICONS.wifi:ICONS.wifiOff}</span><div class="profile-field__content"><p class="profile-field__label">Connection</p><p class="profile-field__value">${state.isLive?(state.wsConnected?'Live — Connected':'Live — Reconnecting...'):'Demo Mode'}</p></div></div>
          </div>
        </div>
        <div class="profile-section">
          <div class="profile-card">
            <h4 class="profile-section-title">Preferences</h4>
            <div class="toggle-row"><div class="toggle-row__left">${ICONS.bell}<span class="toggle-row__label">Notifications</span></div><div class="toggle-switch toggle-switch--on" id="toggle-notif"><span class="toggle-switch__knob"></span></div></div>
            <div class="toggle-row"><div class="toggle-row__left">${ICONS.moon}<span class="toggle-row__label">Dark Mode</span></div><div class="toggle-switch ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'toggle-switch--on' : 'toggle-switch--off'}" id="toggle-dark"><span class="toggle-switch__knob"></span></div></div>
          </div>
        </div>
        <div class="profile-section">
          <button class="btn-logout" id="btn-logout">${ICONS.logout} <span>Log Out</span></button>
        </div>
      </div>
    </div>`;

  document.getElementById('btn-profile-back').onclick = () => { navigate('chat'); };

  let editing=false;
  document.getElementById('btn-edit-profile').onclick = async () => {
    const nameEl=document.getElementById('field-name-display'), btn=document.getElementById('btn-edit-profile');
    if (!editing) {
      editing=true; btn.textContent='Save';
      nameEl.innerHTML = `<input class="profile-field__value" id="edit-name-input" value="${escapeHtml(user.displayName)}" style="background:transparent;border-bottom:1px solid rgba(74,144,226,0.3);padding-bottom:2px;width:100%;font-size:14px">`;
      document.getElementById('edit-name-input').focus();
    } else {
      const newName = document.getElementById('edit-name-input').value.trim();
      if (newName) {
        state.currentUser.displayName = newName;
        document.getElementById('profile-display-name').textContent = newName;
        if (state.isLive) { try { await ApiService.updateProfile(state.currentUser.userId, newName); } catch(e) { console.error('Profile update error:',e); } }
        document.getElementById('profile-save-msg').innerHTML = '<p class="profile-save-msg">✓ Profile updated</p>';
        setTimeout(()=>{const el=document.getElementById('profile-save-msg');if(el)el.innerHTML='';},2000);
      }
      editing=false; btn.textContent='Edit'; nameEl.textContent=state.currentUser.displayName; renderSidebar();
    }
  };

  document.getElementById('toggle-notif').onclick = function(){this.classList.toggle('toggle-switch--on');this.classList.toggle('toggle-switch--off');};
  document.getElementById('toggle-dark').onclick = function(){
    const isDark = this.classList.toggle('toggle-switch--on');
    this.classList.toggle('toggle-switch--off', !isDark);
    const newTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('qc_theme', newTheme);
  };

  document.getElementById('btn-logout').onclick = () => {
    if (state.isLive) {
      AuthService.signOut();
      WsService.disconnect();
      // Nuclear clear: remove ALL Cognito tokens from localStorage
      // This prevents stale sessions from auto-logging in a different user on refresh
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('CognitoIdentityServiceProvider')) {
          localStorage.removeItem(key);
        }
      });
    }
    state.currentUser=null; state.activeConversationId=null; state.conversations=[]; state.messages={}; state.typingUsers={}; state.searchQuery=''; state.wsConnected=false;
    state.view = 'landing';
    render();
  };
}

// ======================== NEW CHAT MODAL ========================
function openNewChatModal() {
  // Remove existing modal if any
  const existingModal = document.getElementById('new-chat-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'new-chat-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-container animate-bounce-in">
      <div class="modal-header">
        <h3 class="modal-title">New Conversation</h3>
        <button class="icon-btn" id="modal-close">&times;</button>
      </div>
      <div class="modal-search">
        <span class="search-box__icon">${ICONS.search}</span>
        <input class="search-box__input" id="user-search-input" type="text" placeholder="Search users by name or email..." autofocus>
      </div>
      <div class="modal-users-list" id="user-search-results">
        <div class="modal-loading"><span class="spinner"></span> Loading users...</div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close modal handlers
  document.getElementById('modal-close').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  // Load all users initially
  loadSearchedUsers('');

  // Search on input
  let searchTimeout;
  document.getElementById('user-search-input').oninput = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => loadSearchedUsers(e.target.value), 300);
  };
}

async function loadSearchedUsers(query) {
  const results = document.getElementById('user-search-results');
  if (!results) return;

  results.innerHTML = '<div class="modal-loading"><span class="spinner"></span> Searching...</div>';

  try {
    let users = [];
    if (state.isLive) {
      const data = await ApiService.searchUsers(state.currentUser.userId, query);
      users = data.users || [];
    } else {
      // Demo mode mocked users
      const mockUsers = [
        { userId: 'user1', displayName: 'Alice Smith', email: 'alice@example.com', status: 'online' },
        { userId: 'user2', displayName: 'Bob Johnson', email: 'bob@example.com', status: 'offline' },
        { userId: 'user3', displayName: 'Charlie Brown', email: 'charlie@example.com', status: 'online' },
        { userId: 'user4', displayName: 'Diana Prince', email: 'diana@example.com', status: 'offline' },
        { userId: 'user5', displayName: 'Evan Wright', email: 'evan@example.com', status: 'online' },
      ];
      users = mockUsers.filter(u => u.displayName.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()));
      // Simulate network delay
      await new Promise(r => setTimeout(r, 400));
    }

    if (!users.length) {
      results.innerHTML = `<div class="no-results">${query ? 'No users found matching "' + escapeHtml(query) + '"' : 'No other users found'}</div>`;
      return;
    }

    window._tempSearchResults = users;

    results.innerHTML = users.map((u, idx) => {
      const dName = u.displayName || (u.email ? u.email.split('@')[0] : (u.userId ? u.userId.substring(0,6) : 'User'));
      const grad = getAvatarGradient(dName);
      return `
        <div class="user-result-item" data-user-idx="${idx}">
          <div class="conv-item__avatar">
            <div class="avatar avatar--md ${grad}">${getInitials(dName)}</div>
            <div class="status-dot status-dot--${u.status || 'offline'}"></div>
          </div>
          <div class="conv-item__info">
            <p class="conv-item__name" style="font-size: 15px;">${escapeHtml(dName)}</p>
          </div>
        </div>`;
    }).join('');

    // Click handler for each user
    results.querySelectorAll('.user-result-item').forEach(el => {
      el.onclick = () => {
        const u = window._tempSearchResults[parseInt(el.dataset.userIdx)];
        startChatWithUser(u);
      };
    });
  } catch (err) {
    console.error('Search users error:', err);
    results.innerHTML = '<div class="no-results">Failed to search users. Please try again.</div>';
  }
}

async function startChatWithUser(user) {
  // Remove existing modals
  const chatModal = document.getElementById('new-chat-modal');
  if (chatModal) chatModal.remove();

  if (!state.isLive) {
    let conv = state.conversations.find(c => c.otherUserId === user.userId || c.participants?.includes(user.userId));
    if (!conv) {
      conv = { conversationId: 'demo-conv-'+generateId(), otherUserId: user.userId, otherDisplayName: user.displayName, otherStatus: user.status, lastMessage: '', lastMessageAt: new Date().toISOString(), unreadCount: 0 };
      state.conversations.unshift(conv);
    }
    state.activeConversationId = conv.conversationId || conv.id;
    renderSidebar(); renderMainArea(); document.getElementById('sidebar').classList.add('sidebar--hidden');
    return;
  }

  try {
    const data = await ApiService.createConversation(
      state.currentUser.userId,
      user.userId,
      state.currentUser.displayName,
      user.displayName
    );
    
    const conv = data.conversation;
    if (!data.existing) state.conversations.unshift(conv);
    
    state.activeConversationId = conv.conversationId;
    const existingConv = state.conversations.find(c => (c.conversationId || c.id) === conv.conversationId);
    if (existingConv) existingConv.unreadCount = 0;
    
    if (!state.messages[conv.conversationId] || !state.messages[conv.conversationId].length) {
      await loadMessages(conv.conversationId);
    }
    
    renderSidebar(); renderMainArea(); document.getElementById('sidebar').classList.add('sidebar--hidden');
  } catch (err) {
    console.error('Create conversation error:', err);
    alert('Failed to start chat: ' + (err.message || 'Unknown error'));
  }
}

// --- Boot ---
boot();
