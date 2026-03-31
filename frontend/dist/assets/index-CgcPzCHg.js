(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const d={chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>',checkcheck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-9.5 9.5L10 17"/></svg>',mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',eyeOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',wifi:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',wifiOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>'};function _(t){return t?t.split(" ").map(s=>s[0]).join("").toUpperCase().slice(0,2):"?"}function N(t){const s=new Date(t);let n=s.getHours(),i=s.getMinutes(),a=n>=12?"PM":"AM";return n=n%12||12,`${n}:${i.toString().padStart(2,"0")} ${a}`}function Q(t){const s=new Date(t),n=new Date;if(s.toDateString()===n.toDateString())return N(t);const i=new Date(n);return i.setDate(i.getDate()-1),s.toDateString()===i.toDateString()?"Yesterday":s.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function F(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}function E(){return Date.now().toString(36)+Math.random().toString(36).slice(2)}function m(t){const s=document.createElement("div");return s.textContent=t,s.innerHTML}function C(t){let s=0;for(let n=0;n<(t||"").length;n++)s=t.charCodeAt(n)+((s<<5)-s);return`avatar--gradient-${Math.abs(s)%8+1}`}const q=localStorage.getItem("qc_theme")||"dark";document.documentElement.setAttribute("data-theme",q);let e={currentUser:null,conversations:[],messages:{},activeConversationId:null,typingUsers:{},view:"landing",authTab:"login",authStep:"form",pendingEmail:"",searchQuery:"",isLive:!1,wsConnected:!1,totalUsers:null,meTyping:!1,isRecording:!1,mediaRecorder:null,audioChunks:[],recordingStartTime:null,recordingTimer:null};const B=document.getElementById("app"),T={};function H(t){if(!t||typeof t!="string")return null;const s=t.match(/\.s3(?:\.[\w-]+)?\.amazonaws\.com\/(.+)$/);return s?decodeURIComponent(s[1]):null}async function P(t){if(!t||t.startsWith("blob:")||t.startsWith("data:"))return t;const s=H(t);if(!s)return t;const n=T[s];if(n&&n.expiresAt>Date.now()+3e5)return n.url;try{const i=await ApiService.getDownloadUrl(s);return T[s]={url:i.downloadUrl,expiresAt:Date.now()+36e5},i.downloadUrl}catch(i){return console.error("Failed to get presigned URL:",i),t}}async function G(){const t=AuthService.init();if(e.isLive=CONFIG.IS_LIVE&&t,e.isLive)try{const s=await AuthService.restoreSession();e.currentUser={userId:s.userId,email:s.email,displayName:s.displayName,status:"online"},e.view="chat",w();try{await ApiService.syncUser(s.userId,s.email,s.displayName)}catch(n){console.warn("syncUser on restore:",n)}await L(),j();return}catch{}w()}async function L(){if(!(!e.isLive||!e.currentUser))try{const t=await ApiService.getChats(e.currentUser.userId);e.conversations=(t.conversations||[]).sort((s,n)=>new Date(n.lastMessageAt)-new Date(s.lastMessageAt)),g();try{const s=await ApiService.searchUsers(e.currentUser.userId,""),n={};(s.users||[]).forEach(a=>n[a.userId]=a);let i=!1;e.conversations.forEach(a=>{const o=a.otherUserId||a.participants&&a.participants.find(c=>c!==e.currentUser.userId);if(o&&n[o]){const c=n[o].displayName||(n[o].email?n[o].email.split("@")[0]:o.substring(0,6)||"User");(a.otherDisplayName==="User"||a.otherDisplayName!==c)&&(a.otherDisplayName=c,a.otherStatus=n[o].status,i=!0)}}),i&&g()}catch(s){console.warn("Silent name sync failed:",s)}}catch(t){console.error("loadChats:",t)}}async function Y(){if(e.isLive)try{const t=await ApiService.getStats();e.totalUsers=t.totalUsers??null;const s=document.getElementById("user-count-badge");s&&(s.textContent=`👥 ${e.totalUsers} users on QuickChat`)}catch(t){console.error("loadStats:",t)}}async function R(t){if(e.isLive)try{const s=await ApiService.getMessages(t);e.messages[t]=(s.messages||[]).map(i=>((i.type==="voice"||typeof i.content=="string"&&i.content.match(/\.(webm|ogg|mp3|m4a|wav)(\?.*)?$/i))&&(i.type="voice",i.voiceUrl||(i.voiceUrl=i.content)),i)).sort((i,a)=>new Date(i.timestamp)-new Date(a.timestamp));const n=e.messages[t].filter(i=>i.type==="voice"&&i.voiceUrl);await Promise.all(n.map(async i=>{i.voiceUrl=await P(i.voiceUrl)}))}catch(s){console.error("loadMessages:",s)}}function j(){!e.isLive||!e.currentUser||(WsService.connect(e.currentUser.userId),WsService.on("connected",()=>{e.wsConnected=!0,D()}),WsService.on("disconnected",()=>{e.wsConnected=!1,D()}),WsService.on("newMessage",async t=>{var i;e.messages[t.conversationId]||(e.messages[t.conversationId]=[]);const s=t.type==="voice"||typeof t.content=="string"&&t.content.match(/\.(webm|ogg|mp3|m4a|wav)(\?.*)?$/i);if(s&&(t.type="voice",t.voiceUrl||(t.voiceUrl=t.content),t.voiceUrl=await P(t.voiceUrl)),t.senderId===((i=e.currentUser)==null?void 0:i.userId)){const a=e.messages[t.conversationId].findIndex(o=>o.isPending&&(o.content===t.content||o.type==="voice"&&t.type==="voice"));if(a!==-1){const o=e.messages[t.conversationId][a].voiceUrl;e.messages[t.conversationId][a]=t,s&&o&&o.startsWith("blob:")&&(e.messages[t.conversationId][a].voiceUrl=o)}else e.messages[t.conversationId].find(o=>o.messageId===t.messageId)||e.messages[t.conversationId].push(t)}else e.messages[t.conversationId].find(a=>a.messageId===t.messageId)||e.messages[t.conversationId].push(t);e.messages[t.conversationId].sort((a,o)=>new Date(a.timestamp)-new Date(o.timestamp));let n=e.conversations.find(a=>(a.conversationId||a.id)===t.conversationId);n||(e.isLive?(await L(),n=e.conversations.find(a=>(a.conversationId||a.id)===t.conversationId)):(n={conversationId:t.conversationId,otherDisplayName:"New User",lastMessage:"",lastMessageAt:t.timestamp,unreadCount:0},e.conversations.unshift(n))),n&&(n.lastMessage=t.type==="voice"?"🎙️ Voice message":t.content,n.lastMessageAt=t.timestamp,e.activeConversationId!==t.conversationId&&(n.unreadCount=(n.unreadCount||0)+1)),e.conversations.sort((a,o)=>new Date(o.lastMessageAt)-new Date(a.lastMessageAt)),e.activeConversationId===t.conversationId&&x(),g()}),WsService.on("typing",t=>{e.typingUsers[t.conversationId]||(e.typingUsers[t.conversationId]={}),e.typingUsers[t.conversationId][t.userId]=t.isTyping,e.activeConversationId===t.conversationId&&V(),g()}),WsService.on("messageDeleted",t=>{if(e.messages[t.conversationId]){e.messages[t.conversationId]=e.messages[t.conversationId].filter(n=>n.messageId!==t.messageId),e.activeConversationId===t.conversationId&&x();const s=e.conversations.find(n=>n.conversationId===t.conversationId);if(s&&e.messages[t.conversationId].length>0){const n=e.messages[t.conversationId][e.messages[t.conversationId].length-1];s.lastMessage=n.content,s.lastMessageAt=n.timestamp}else s&&(s.lastMessage="Message deleted");g()}}),WsService.on("userStatus",t=>{e.conversations.forEach(i=>{(i.otherUserId||i.participants&&i.participants.find(o=>o!==e.currentUser.userId))===t.userId&&(i.otherStatus=t.status)});const s=e.conversations.find(i=>(i.conversationId||i.id)===e.activeConversationId);if(((s==null?void 0:s.otherUserId)||(s==null?void 0:s.participants)&&(s==null?void 0:s.participants.find(i=>i!==e.currentUser.userId)))===t.userId){const i=document.querySelector(".chat-header__status");i&&(i.textContent=t.status==="online"?"Online":"Offline",i.className=`chat-header__status chat-header__status--${t.status}`)}g()}))}function V(){const t=document.getElementById("typing-indicator-container");if(!t)return;const s=e.typingUsers[e.activeConversationId]||{};Object.values(s).some(i=>i)?(t.innerHTML='<div class="typing-indicator"><span></span><span></span><span></span></div><span class="typing-text">typing...</span>',t.classList.add("visible")):(t.innerHTML="",t.classList.remove("visible"))}function D(){const t=document.getElementById("ws-status-dot");t&&(t.className=e.wsConnected?"sidebar-brand__dot sidebar-brand__dot--online":"sidebar-brand__dot sidebar-brand__dot--offline")}function w(){e.view==="landing"?te():e.view==="auth"?I():ae()}async function h(t,s=!0,n={}){if(n.activeConversationId!==void 0&&(e.activeConversationId=n.activeConversationId,e.activeConversationId)){const i=e.conversations.find(a=>(a.conversationId||a.id)===e.activeConversationId);i&&(i.unreadCount=0),e.isLive&&(!e.messages[e.activeConversationId]||!e.messages[e.activeConversationId].length)&&await R(e.activeConversationId)}if(e.view=t,s){const i={view:e.view,activeConversationId:e.activeConversationId};history.pushState(i,"")}w()}window.onpopstate=t=>{t.state?(e.view=t.state.view,e.activeConversationId=t.state.activeConversationId,w()):(e.view="landing",e.activeConversationId=null,w())};function K(t){const s=Math.floor(t/1e3),n=Math.floor(s/60),i=s%60;return`${n}:${i.toString().padStart(2,"0")}`}async function J(){try{const t=await navigator.mediaDevices.getUserMedia({audio:!0});e.audioChunks=[];const s=MediaRecorder.isTypeSupported("audio/webm;codecs=opus")?"audio/webm;codecs=opus":"audio/webm";e.mediaRecorder=new MediaRecorder(t,{mimeType:s}),e.mediaRecorder.ondataavailable=n=>{n.data.size>0&&e.audioChunks.push(n.data)},e.mediaRecorder.onstop=()=>{t.getTracks().forEach(n=>n.stop())},e.mediaRecorder.start(100),e.isRecording=!0,e.recordingStartTime=Date.now(),e.recordingTimer=setInterval(()=>{const n=document.getElementById("recording-timer");n&&(n.textContent=K(Date.now()-e.recordingStartTime))},200),S()}catch(t){console.error("Microphone access denied:",t),alert("Please allow microphone access to send voice messages.")}}function X(){e.mediaRecorder&&e.mediaRecorder.state!=="inactive"&&e.mediaRecorder.stop(),clearInterval(e.recordingTimer),e.isRecording=!1,e.audioChunks=[],e.mediaRecorder=null,e.recordingStartTime=null,S()}async function Z(){if(!(!e.mediaRecorder||e.mediaRecorder.state==="inactive"))return new Promise(t=>{e.mediaRecorder.onstop=async()=>{var i;(i=e.mediaRecorder.stream)==null||i.getTracks().forEach(a=>a.stop()),clearInterval(e.recordingTimer),e.isRecording=!1;const s=new Blob(e.audioChunks,{type:"audio/webm"}),n=Math.floor((Date.now()-e.recordingStartTime)/1e3);e.audioChunks=[],e.recordingStartTime=null,S(),await ee(s,n),t()},e.mediaRecorder.stop()})}async function ee(t,s){const n=e.activeConversationId,i=e.conversations.find(l=>(l.conversationId||l.id)===n),a=k(i),o=URL.createObjectURL(t),c={messageId:E(),conversationId:n,senderId:e.currentUser.userId,content:"🎙️ Voice message",timestamp:new Date().toISOString(),type:"voice",voiceUrl:o,voiceDuration:s,isPending:!0};e.messages[n]||(e.messages[n]=[]),e.messages[n].push(c);const p=e.conversations.find(l=>(l.conversationId||l.id)===n);if(p&&(p.lastMessage="🎙️ Voice message",p.lastMessageAt=c.timestamp),e.conversations.sort((l,r)=>new Date(r.lastMessageAt)-new Date(l.lastMessageAt)),x(),g(),e.isLive)try{const l=new File([t],`voice-${Date.now()}.webm`,{type:"audio/webm"}),{fileUrl:r}=await ApiService.uploadFile(l),u=a.userId||"";WsService.send("sendMessage",{conversationId:n,senderId:e.currentUser.userId,content:r,recipientId:u,type:"voice",voiceDuration:s})}catch(l){console.error("Voice upload failed:",l)}}function te(){B.innerHTML=`
    <div class="landing-page">
      <nav class="landing-nav">
        <div class="landing-nav__brand">
          <div class="auth-hero__icon" style="width:40px;height:40px">${d.chat}</div>
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
              <div class="feature-card__icon">${d.wifi}</div>
              <h3 class="feature-card__title">Real-Time Sync</h3>
              <p class="feature-card__text">Experience zero-latency messaging powered by cutting-edge WebSocket infrastructure.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">${d.shield}</div>
              <h3 class="feature-card__title">Enterprise Security</h3>
              <p class="feature-card__text">Your data is secured in transit and at rest using top-tier AWS Cognito standards.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">${d.moon}</div>
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
  `,document.getElementById("btn-landing-login").onclick=()=>{e.authTab="login",e.authStep="form",h("auth")},document.getElementById("btn-landing-signup").onclick=()=>{e.authTab="signup",e.authStep="form",h("auth")},document.getElementById("btn-hero-cta").onclick=()=>{e.authTab="signup",e.authStep="form",h("auth")},document.getElementById("btn-hero-demo").onclick=()=>{e.authTab="login",e.authStep="form",h("auth")}}function I(){const t=e.authTab==="login";B.innerHTML=`
    <div class="auth-page">
      <div class="auth-split">
        <div class="auth-split__left">
          <div class="auth-hero__logo">
            <div class="auth-hero__icon">${d.chat}</div>
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
            ${e.isLive?'<span class="live-badge">● Live Production Environment</span>':'<span class="demo-badge">Demo Mode</span>'}
          </div>
        </div>
        
        <div class="auth-split__right">
          <div class="auth-container">
            <div class="glass-card auth-card">
              <div class="auth-tabs">
                <button class="auth-tab ${t?"auth-tab--active":""}" id="tab-login">Sign In</button>
                <button class="auth-tab ${t?"":"auth-tab--active"}" id="tab-signup">Sign Up</button>
              </div>
              <div id="auth-form-area"></div>
            </div>
            <p class="auth-footer">© 2024 QuickChat. Humanizing connections.</p>
          </div>
        </div>
      </div>
    </div>`,document.getElementById("tab-login").onclick=()=>{e.authTab="login",e.authStep="form",I()},document.getElementById("tab-signup").onclick=()=>{e.authTab="signup",e.authStep="form",I()},e.authStep==="confirm"?ie():t?se():ne()}function se(){const t=document.getElementById("auth-form-area");t.innerHTML=`
    <form id="login-form">
      <div id="login-error"></div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-wrapper">
          <span class="input-icon">${d.mail}</span>
          <input class="input-field" type="email" id="login-email" placeholder="you@example.com" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-wrapper">
          <span class="input-icon">${d.lock}</span>
          <input class="input-field" type="password" id="login-password" placeholder="Enter your password" required style="padding-right:44px">
          <button type="button" class="input-toggle" id="login-toggle-pw">${d.eye}</button>
        </div>
      </div>
      <div class="form-extras">
        <label><input type="checkbox"> Remember me</label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" class="btn-primary" id="login-submit">Sign In</button>
      ${e.isLive?"":'<p class="form-hint">Demo mode: Enter any email and password</p>'}
    </form>`;const s=document.getElementById("login-password");document.getElementById("login-toggle-pw").onclick=()=>{const n=s.type==="password";s.type=n?"text":"password",document.getElementById("login-toggle-pw").innerHTML=n?d.eyeOff:d.eye},document.getElementById("login-form").onsubmit=async n=>{n.preventDefault();const i=document.getElementById("login-email").value,a=document.getElementById("login-password").value;if(!i||!a){y("login-error","Please enter email and password");return}const o=document.getElementById("login-submit");if(o.innerHTML='<span class="spinner"></span> Signing in...',o.disabled=!0,e.isLive)try{const c=await AuthService.signIn(i,a);e.currentUser={userId:c.userId,email:c.email,displayName:c.displayName,status:"online"};try{await ApiService.syncUser(c.userId,c.email,c.displayName)}catch(p){console.warn("syncUser on login:",p)}e.view="chat",h("chat"),await L(),Y(),j()}catch(c){c.code==="UserNotConfirmedException"?(e.pendingEmail=i,e.authStep="confirm",I()):(y("login-error",c.message||"Login failed"),o.innerHTML="Sign In",o.disabled=!1)}else setTimeout(()=>{e.view="chat",h("chat")},600)}}function ne(){const t=document.getElementById("auth-form-area");t.innerHTML=`
    <form id="signup-form">
      <div id="signup-error"></div>
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <div class="input-wrapper"><span class="input-icon">${d.user}</span><input class="input-field" type="text" id="signup-name" placeholder="John Doe" required></div>
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-wrapper"><span class="input-icon">${d.mail}</span><input class="input-field" type="email" id="signup-email" placeholder="you@example.com" required></div>
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <div class="input-wrapper"><span class="input-icon">${d.phone}</span><input class="input-field" type="tel" id="signup-phone" placeholder="+1234567890 (include + and country code)" required></div>
      </div>
      <div class="form-group">
        <label class="form-label">Password</label>
        <div class="input-wrapper"><span class="input-icon">${d.lock}</span><input class="input-field" type="password" id="signup-password" placeholder="Min. 8 characters" required style="padding-right:44px">
          <button type="button" class="input-toggle" id="signup-toggle-pw">${d.eye}</button></div>
      </div>
      <div class="form-group">
        <label class="form-label">Confirm Password</label>
        <div class="input-wrapper"><span class="input-icon">${d.lock}</span><input class="input-field" type="password" id="signup-confirm" placeholder="Repeat your password" required></div>
      </div>
      <button type="submit" class="btn-primary" id="signup-submit">Create Account</button>
      ${e.isLive?`<p class="form-hint">You'll receive an SMS verification code</p>`:'<p class="form-hint">Demo mode: fills mock data</p>'}
    </form>`;const s=document.getElementById("signup-password");document.getElementById("signup-toggle-pw").onclick=()=>{const n=s.type==="password";s.type=n?"text":"password",document.getElementById("signup-toggle-pw").innerHTML=n?d.eyeOff:d.eye},document.getElementById("signup-form").onsubmit=async n=>{var r;n.preventDefault();const i=document.getElementById("signup-name").value,a=document.getElementById("signup-email").value,o=document.getElementById("signup-phone").value,c=document.getElementById("signup-password").value,p=document.getElementById("signup-confirm").value;if(!i||!a||!c||!o){y("signup-error","Please fill in all fields");return}if(c!==p){y("signup-error","Passwords do not match");return}if(!o.startsWith("+")){y("signup-error","Phone number must start with + and country code (e.g. +91...)");return}const l=document.getElementById("signup-submit");if(l.innerHTML='<span class="spinner"></span> Creating...',l.disabled=!0,e.isLive)try{const u=await AuthService.signUp(i,a,o,c);e.pendingEmail=a,e.deliveryDestination=((r=u==null?void 0:u.codeDeliveryDetails)==null?void 0:r.Destination)||o,e.authStep="confirm",I()}catch(u){y("signup-error",u.message||"Sign up failed"),l.innerHTML="Create Account",l.disabled=!1}else setTimeout(()=>{e.view="chat",h("chat")},800)}}function ie(){const t=document.getElementById("auth-form-area"),s=e.deliveryDestination||e.pendingEmail;t.innerHTML=`
    <form id="confirm-form">
      <div id="confirm-error"></div>
      <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px;text-align:center">We sent a verification code to <strong>${m(s)}</strong></p>
      <div class="form-group">
        <label class="form-label">Verification Code</label>
        <div class="input-wrapper"><span class="input-icon">${d.shield}</span><input class="input-field" type="text" id="confirm-code" placeholder="123456" required autocomplete="one-time-code" maxlength="6" style="letter-spacing:8px;text-align:center;font-size:20px;font-weight:700"></div>
      </div>
      <button type="submit" class="btn-primary" id="confirm-submit">Verify Account</button>
      <p class="form-hint" style="margin-top:12px">Didn't get the code? <a href="#" id="resend-code" style="color:var(--electric)">Resend</a></p>
    </form>`,document.getElementById("confirm-form").onsubmit=async n=>{n.preventDefault();const i=document.getElementById("confirm-code").value.trim();if(!i){y("confirm-error","Enter the 6-digit code");return}const a=document.getElementById("confirm-submit");a.innerHTML='<span class="spinner"></span> Verifying...',a.disabled=!0;try{await AuthService.confirmSignUp(e.pendingEmail,i),e.authStep="form",e.authTab="login",I(),setTimeout(()=>y("login-error",'<div style="background:rgba(52,211,153,0.1);border-color:rgba(52,211,153,0.2);color:var(--emerald)" class="auth-error">Account verified! Please sign in.</div>',!0),50)}catch(o){y("confirm-error",o.message||"Invalid code"),a.innerHTML="Verify Account",a.disabled=!1}},document.getElementById("resend-code").onclick=async n=>{n.preventDefault();try{await AuthService.resendConfirmation(e.pendingEmail),y("confirm-error",'<div style="background:rgba(52,211,153,0.1);border-color:rgba(52,211,153,0.2);color:var(--emerald)" class="auth-error">Code resent!</div>',!0)}catch(i){y("confirm-error",i.message)}}}function y(t,s,n=!1){const i=document.getElementById(t);i&&(i.innerHTML=n?s:`<div class="auth-error">${m(s)}</div>`)}function ae(){B.innerHTML='<div class="chat-page"><div class="sidebar" id="sidebar"></div><div class="chat-main" id="chat-main"></div></div>';const t=document.getElementById("sidebar");e.activeConversationId||e.view==="profile"?t.classList.add("sidebar--hidden"):t.classList.remove("sidebar--hidden"),g(),$()}function k(t){if(t.otherDisplayName)return{displayName:t.otherDisplayName,status:t.otherStatus||"offline",userId:t.otherUserId||""};if(t.participants){const s=t.participants.find(n=>n!==e.currentUser.userId);return{displayName:s||"User",status:"online",userId:s||""}}return{displayName:t.conversationId||"Chat",status:"offline",userId:""}}function g(){const t=document.getElementById("sidebar");if(!t)return;const s=e.currentUser,n=e.searchQuery?e.conversations.filter(a=>k(a).displayName.toLowerCase().includes(e.searchQuery.toLowerCase())||(a.lastMessage||"").toLowerCase().includes(e.searchQuery.toLowerCase())):e.conversations;let i="";n.length?i=n.map(a=>{const o=k(a),c=a.conversationId||a.id,p=e.activeConversationId===c,l=C(o.displayName),r=e.typingUsers[c]||{},u=Object.values(r).some(f=>f);let v=a.lastMessage||"";!u&&v&&H(v)&&(v="🎙️ Voice message");const b=u?'<span class="typing-preview">typing...</span>':m(v);return`
        <div class="conv-item ${p?"conv-item--active":""}" data-conv-id="${c}">
          <div class="conv-item__avatar">
            <div class="avatar avatar--md ${l}">${_(o.displayName)}</div>
            <div class="status-dot status-dot--${o.status}"></div>
          </div>
          <div class="conv-item__info">
            <div class="conv-item__top">
              <span class="conv-item__name">${m(o.displayName)}</span>
              <span class="conv-item__time">${a.lastMessageAt?Q(a.lastMessageAt):""}</span>
            </div>
            <p class="conv-item__preview">${b}</p>
          </div>
          ${(a.unreadCount||0)>0?`<span class="conv-item__badge">${a.unreadCount}</span>`:""}
        </div>`}).join(""):i=`<div class="no-results">${e.searchQuery?"No conversations found":"No chats yet — start a new one!"}</div>`,t.innerHTML=`
    <div class="sidebar-header">
      <div class="sidebar-top">
        <div class="sidebar-brand">
          <div class="sidebar-brand__icon">${d.chat}</div>
          <span class="sidebar-brand__name">QuickChat</span>
          <div class="sidebar-brand__dot ${e.wsConnected?"sidebar-brand__dot--online":"sidebar-brand__dot--offline"}" id="ws-status-dot" title="${e.wsConnected?"Connected":"Disconnected"}"></div>
        </div>
        <div class="sidebar-actions">
          <button class="icon-btn" id="btn-new-chat" title="New chat">${d.plus}</button>
          <button class="icon-btn" id="btn-open-settings" title="Settings">${d.settings}</button>
        </div>
      </div>
      <div class="search-box">
        <span class="search-box__icon">${d.search}</span>
        <input class="search-box__input" id="search-input" type="text" placeholder="Search conversations..." value="${m(e.searchQuery)}">
      </div>
    </div>
    ${e.isLive&&e.totalUsers!==null?`<div class="user-count-badge" id="user-count-badge">👥 ${e.totalUsers} users on QuickChat</div>`:""}
    <div class="conv-list scrollbar-hide" id="conv-list">${i}</div>
    <div class="sidebar-footer">
      <div class="sidebar-user" id="sidebar-user-btn">
        <div class="avatar avatar--sm avatar--gradient-8">${_(s.displayName)}</div>
        <div class="sidebar-user__info">
          <p class="sidebar-user__name">${m(s.displayName)}</p>
          <p class="sidebar-user__status"><span class="sidebar-user__status-dot"></span> ${e.isLive?"Live":"Demo"}</p>
        </div>
      </div>
    </div>`,document.getElementById("search-input").oninput=a=>{e.searchQuery=a.target.value,g()},document.querySelectorAll(".conv-item").forEach(a=>{a.onclick=async()=>{const o=a.dataset.convId;h("chat",!0,{activeConversationId:o})}}),document.getElementById("btn-new-chat").onclick=()=>re(),document.getElementById("btn-open-settings").onclick=()=>{h("profile")},document.getElementById("sidebar-user-btn").onclick=()=>{h("profile")}}function $(){if(e.view==="profile"){oe();return}if(!e.activeConversationId){O();return}x()}function O(){document.getElementById("chat-main").innerHTML=`
    <div class="empty-state">
      <div class="empty-state__icon">${d.chat}</div>
      <h3 class="empty-state__title">Welcome to QuickChat</h3>
      <p class="empty-state__text">Select a conversation to start chatting${e.isLive?" in real-time":" (demo mode)"}</p>
    </div>`}function x(){const t=document.getElementById("chat-main"),s=e.activeConversationId,n=e.conversations.find(r=>(r.conversationId||r.id)===s);if(!n){O();return}const i=k(n),a=e.messages[s]||[],o=C(i.displayName);let c="",p=null;a.forEach(r=>{const u=new Date(r.timestamp).toDateString();u!==p&&(c+=`<div class="date-separator"><div class="date-separator__line"></div><span class="date-separator__text">${F(r.timestamp)}</span><div class="date-separator__line"></div></div>`,p=u);const v=r.senderId===e.currentUser.userId,b=r.type==="voice";let f;if(b){const M=r.voiceUrl||r.content,U=r.voiceDuration||0,z=`${Math.floor(U/60)}:${(U%60).toString().padStart(2,"0")}`;f=`
        <div class="voice-message">
          <audio id="audio-${r.messageId}" class="voice-audio" src="${M}" preload="metadata"></audio>
          <button class="voice-play-btn" id="play-btn-${r.messageId}" onclick="togglePlayVoice('${r.messageId}')">
            ${d.play}
          </button>
          <div class="voice-waveform">
            <div class="voice-waveform__bars">
              ${Array.from({length:28},()=>`<div class="voice-bar" style="height:${Math.floor(Math.random()*80+20)}%"></div>`).join("")}
            </div>
            <div class="voice-progress" id="voice-progress-${r.messageId}"></div>
          </div>
          <span class="voice-duration">${z}</span>
        </div>`}else f=`<p class="message-text">${m(r.content)}</p>`;c+=`
      <div class="message-row ${v?"message-row--sent":"message-row--received"}" id="msg-${r.messageId}">
        <div class="message-bubble ${v?"message-bubble--sent":"message-bubble--received"} ${b?"message-bubble--voice":""}">
          <div class="message-bubble__content">
            ${f}
            ${v&&!r.isPending?`<button class="message-delete-btn" title="Delete message" onclick="deleteMessage('${r.conversationId}', '${r.messageId}')">${d.trash}</button>`:""}
          </div>
          <div class="message-meta">
            <span class="message-time">${N(r.timestamp)}</span>
            ${v?`<span class="message-check">${d.checkcheck}</span>`:""}
          </div>
        </div>
      </div>`}),t.innerHTML=`
    <div class="chat-header">
      <div class="chat-header__left">
        <button class="chat-header__back icon-btn" id="btn-chat-back">${d.back}</button>
        <div class="avatar avatar--sm ${o}">${_(i.displayName)}</div>
        <div>
          <div class="chat-header__name">${m(i.displayName)}</div>
          <div class="chat-header__status chat-header__status--${i.status}">${i.status==="online"?"Online":"Offline"}</div>
        </div>
      </div>
      <div class="chat-header__actions">
        <button class="icon-btn">${d.more}</button>
      </div>
    </div>
    <div class="messages-area scrollbar-hide" id="messages-area">
      ${c}
      <div id="typing-indicator-container" class="typing-container"></div>
    </div>
    <div class="message-input-area" id="message-input-area">
    </div>`,S();const l=document.getElementById("messages-area");l.scrollTop=l.scrollHeight,V(),document.getElementById("btn-chat-back").onclick=()=>{h("chat",!0,{activeConversationId:null})},W()}function S(){const t=document.getElementById("message-input-area");t&&(e.isRecording?(t.innerHTML=`
      <div class="voice-recording-bar">
        <button class="voice-cancel-btn" id="btn-cancel-recording" title="Cancel">${d.trash}</button>
        <div class="voice-recording-info">
          <div class="voice-recording-pulse"></div>
          <span class="voice-recording-timer" id="recording-timer">0:00</span>
          <div class="voice-recording-wave">
            ${Array.from({length:20},()=>"<span></span>").join("")}
          </div>
        </div>
        <button class="voice-send-btn" id="btn-send-recording" title="Send">${d.send}</button>
      </div>`,document.getElementById("btn-cancel-recording").onclick=X,document.getElementById("btn-send-recording").onclick=Z):(t.innerHTML=`
      <div class="message-input-row">
        <textarea class="message-textarea" id="msg-input" rows="1" placeholder="Type a message..."></textarea>
        <button class="icon-btn voice-mic-btn" id="btn-mic" title="Voice message">${d.mic}</button>
        <button class="send-btn send-btn--disabled" id="btn-send">${d.send}</button>
      </div>`,W()))}function W(){const t=document.getElementById("msg-input"),s=document.getElementById("btn-send"),n=document.getElementById("btn-mic");if(!t||!s)return;function i(){t.value.trim()?(s.className="send-btn send-btn--active",s.style.display="",n&&(n.style.display="none")):(s.className="send-btn send-btn--disabled",s.style.display="none",n&&(n.style.display=""))}i();let a;t.oninput=()=>{if(t.style.height="auto",t.style.height=Math.min(t.scrollHeight,120)+"px",i(),e.isLive&&e.activeConversationId){const r=e.conversations.find(v=>(v.conversationId||v.id)===e.activeConversationId),u=(r==null?void 0:r.otherUserId)||(r==null?void 0:r.participants)&&(r==null?void 0:r.participants.find(v=>v!==e.currentUser.userId));u&&(e.meTyping||(e.meTyping=!0,WsService.sendTyping(e.activeConversationId,e.currentUser.userId,u,!0)),clearTimeout(a),a=setTimeout(()=>{e.meTyping=!1,WsService.sendTyping(e.activeConversationId,e.currentUser.userId,u,!1)},3e3))}};const o=e.activeConversationId,c=e.conversations.find(r=>(r.conversationId||r.id)===o),p=c?k(c):{userId:""};function l(){const r=t.value.trim();if(!r)return;const u=e.activeConversationId,v={messageId:E(),conversationId:u,senderId:e.currentUser.userId,content:r,timestamp:new Date().toISOString(),type:"text",isPending:!0};e.messages[u]||(e.messages[u]=[]),e.messages[u].push(v);const b=e.conversations.find(f=>(f.conversationId||f.id)===u);if(b&&(b.lastMessage=r,b.lastMessageAt=v.timestamp),e.conversations.sort((f,M)=>new Date(M.lastMessageAt)-new Date(f.lastMessageAt)),t.value="",t.style.height="auto",i(),x(),g(),e.isLive){const f=p.userId||"";WsService.sendMessage(u,e.currentUser.userId,r,f)}}s.onclick=l,t.onkeydown=r=>{r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),l())},n&&(n.onclick=J),t.focus()}function oe(){const t=document.getElementById("chat-main"),s=e.currentUser,n=C(s.displayName);t.innerHTML=`
    <div class="profile-page">
      <div class="profile-header">
        <button class="icon-btn" id="btn-profile-back">${d.back}</button>
        <h2 class="profile-header__title">Profile & Settings</h2>
      </div>
      <div class="profile-body scrollbar-hide">
        <div class="profile-avatar-section">
          <div class="profile-avatar-wrapper">
            <div class="avatar avatar--xl ${n}">${_(s.displayName)}</div>
            <button class="profile-avatar-btn">${d.camera}</button>
          </div>
          <h3 class="profile-name" id="profile-display-name">${m(s.displayName)}</h3>
          <p class="profile-email">${m(s.email)}</p>
          <div id="profile-save-msg"></div>
        </div>
        <div class="profile-section">
          <div class="profile-card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <h4 class="profile-section-title" style="margin-bottom:0">Profile Information</h4>
              <button class="profile-edit-btn" id="btn-edit-profile">Edit</button>
            </div>
            <div class="profile-field"><span class="profile-field__icon">${d.user}</span><div class="profile-field__content"><p class="profile-field__label">Display Name</p><p class="profile-field__value" id="field-name-display">${m(s.displayName)}</p></div></div>
            <div class="profile-field"><span class="profile-field__icon">${d.mail}</span><div class="profile-field__content"><p class="profile-field__label">Email</p><p class="profile-field__value">${m(s.email)}</p></div></div>
            <div class="profile-field"><span class="profile-field__icon">${e.wsConnected?d.wifi:d.wifiOff}</span><div class="profile-field__content"><p class="profile-field__label">Connection</p><p class="profile-field__value">${e.isLive?e.wsConnected?"Live — Connected":"Live — Reconnecting...":"Demo Mode"}</p></div></div>
          </div>
        </div>
        <div class="profile-section">
          <div class="profile-card">
            <h4 class="profile-section-title">Preferences</h4>
            <div class="toggle-row"><div class="toggle-row__left">${d.bell}<span class="toggle-row__label">Notifications</span></div><div class="toggle-switch toggle-switch--on" id="toggle-notif"><span class="toggle-switch__knob"></span></div></div>
            <div class="toggle-row"><div class="toggle-row__left">${d.moon}<span class="toggle-row__label">Dark Mode</span></div><div class="toggle-switch ${document.documentElement.getAttribute("data-theme")==="dark"?"toggle-switch--on":"toggle-switch--off"}" id="toggle-dark"><span class="toggle-switch__knob"></span></div></div>
          </div>
        </div>
        <div class="profile-section">
          <button class="btn-logout" id="btn-logout">${d.logout} <span>Log Out</span></button>
        </div>
      </div>
    </div>`,document.getElementById("btn-profile-back").onclick=()=>{h("chat")};let i=!1;document.getElementById("btn-edit-profile").onclick=async()=>{const a=document.getElementById("field-name-display"),o=document.getElementById("btn-edit-profile");if(!i)i=!0,o.textContent="Save",a.innerHTML=`<input class="profile-field__value" id="edit-name-input" value="${m(s.displayName)}" style="background:transparent;border-bottom:1px solid rgba(74,144,226,0.3);padding-bottom:2px;width:100%;font-size:14px">`,document.getElementById("edit-name-input").focus();else{const c=document.getElementById("edit-name-input").value.trim();if(c){if(e.currentUser.displayName=c,document.getElementById("profile-display-name").textContent=c,e.isLive)try{await ApiService.updateProfile(e.currentUser.userId,c)}catch(p){console.error("Profile update error:",p)}document.getElementById("profile-save-msg").innerHTML='<p class="profile-save-msg">✓ Profile updated</p>',setTimeout(()=>{const p=document.getElementById("profile-save-msg");p&&(p.innerHTML="")},2e3)}i=!1,o.textContent="Edit",a.textContent=e.currentUser.displayName,g()}},document.getElementById("toggle-notif").onclick=function(){this.classList.toggle("toggle-switch--on"),this.classList.toggle("toggle-switch--off")},document.getElementById("toggle-dark").onclick=function(){const a=this.classList.toggle("toggle-switch--on");this.classList.toggle("toggle-switch--off",!a);const o=a?"dark":"light";document.documentElement.setAttribute("data-theme",o),localStorage.setItem("qc_theme",o)},document.getElementById("btn-logout").onclick=()=>{e.isLive&&(AuthService.signOut(),WsService.disconnect(),Object.keys(localStorage).forEach(a=>{a.startsWith("CognitoIdentityServiceProvider")&&localStorage.removeItem(a)})),e.currentUser=null,e.activeConversationId=null,e.conversations=[],e.messages={},e.typingUsers={},e.searchQuery="",e.wsConnected=!1,e.view="landing",w()}}function re(){const t=document.getElementById("new-chat-modal");t&&t.remove();const s=document.createElement("div");s.id="new-chat-modal",s.className="modal-overlay",s.innerHTML=`
    <div class="modal-container animate-bounce-in">
      <div class="modal-header">
        <h3 class="modal-title">New Conversation</h3>
        <button class="icon-btn" id="modal-close">&times;</button>
      </div>
      <div class="modal-search">
        <span class="search-box__icon">${d.search}</span>
        <input class="search-box__input" id="user-search-input" type="text" placeholder="Search users by name or email..." autofocus>
      </div>
      <div class="modal-users-list" id="user-search-results">
        <div class="modal-loading"><span class="spinner"></span> Loading users...</div>
      </div>
    </div>
  `,document.body.appendChild(s),document.getElementById("modal-close").onclick=()=>s.remove(),s.onclick=i=>{i.target===s&&s.remove()},A("");let n;document.getElementById("user-search-input").oninput=i=>{clearTimeout(n),n=setTimeout(()=>A(i.target.value),300)}}async function A(t){const s=document.getElementById("user-search-results");if(s){s.innerHTML='<div class="modal-loading"><span class="spinner"></span> Searching...</div>';try{let n=[];if(e.isLive?n=(await ApiService.searchUsers(e.currentUser.userId,t)).users||[]:(n=[{userId:"user1",displayName:"Alice Smith",email:"alice@example.com",status:"online"},{userId:"user2",displayName:"Bob Johnson",email:"bob@example.com",status:"offline"},{userId:"user3",displayName:"Charlie Brown",email:"charlie@example.com",status:"online"},{userId:"user4",displayName:"Diana Prince",email:"diana@example.com",status:"offline"},{userId:"user5",displayName:"Evan Wright",email:"evan@example.com",status:"online"}].filter(a=>a.displayName.toLowerCase().includes(t.toLowerCase())||a.email.toLowerCase().includes(t.toLowerCase())),await new Promise(a=>setTimeout(a,400))),!n.length){s.innerHTML=`<div class="no-results">${t?'No users found matching "'+m(t)+'"':"No other users found"}</div>`;return}window._tempSearchResults=n,s.innerHTML=n.map((i,a)=>{const o=i.displayName||(i.email?i.email.split("@")[0]:i.userId?i.userId.substring(0,6):"User"),c=C(o);return`
        <div class="user-result-item" data-user-idx="${a}">
          <div class="conv-item__avatar">
            <div class="avatar avatar--md ${c}">${_(o)}</div>
            <div class="status-dot status-dot--${i.status||"offline"}"></div>
          </div>
          <div class="conv-item__info">
            <p class="conv-item__name" style="font-size: 15px;">${m(o)}</p>
          </div>
        </div>`}).join(""),s.querySelectorAll(".user-result-item").forEach(i=>{i.onclick=()=>{const a=window._tempSearchResults[parseInt(i.dataset.userIdx)];ce(a)}})}catch(n){console.error("Search users error:",n),s.innerHTML='<div class="no-results">Failed to search users. Please try again.</div>'}}}async function ce(t){const s=document.getElementById("new-chat-modal");if(s&&s.remove(),!e.isLive){let n=e.conversations.find(i=>{var a;return i.otherUserId===t.userId||((a=i.participants)==null?void 0:a.includes(t.userId))});n||(n={conversationId:"demo-conv-"+E(),otherUserId:t.userId,otherDisplayName:t.displayName,otherStatus:t.status,lastMessage:"",lastMessageAt:new Date().toISOString(),unreadCount:0},e.conversations.unshift(n)),e.activeConversationId=n.conversationId||n.id,g(),$(),document.getElementById("sidebar").classList.add("sidebar--hidden");return}try{const n=await ApiService.createConversation(e.currentUser.userId,t.userId,e.currentUser.displayName,t.displayName),i=n.conversation;n.existing||e.conversations.unshift(i),e.activeConversationId=i.conversationId;const a=e.conversations.find(o=>(o.conversationId||o.id)===i.conversationId);a&&(a.unreadCount=0),(!e.messages[i.conversationId]||!e.messages[i.conversationId].length)&&await R(i.conversationId),g(),$(),document.getElementById("sidebar").classList.add("sidebar--hidden")}catch(n){console.error("Create conversation error:",n),alert("Failed to start chat: "+(n.message||"Unknown error"))}}G();
