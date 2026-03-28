import { useState, useCallback } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import ProfileSettings from '../components/profile/ProfileSettings';
import { useChat } from '../context/ChatContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ChatPage() {
  const { activeConversation, setActiveConversation, loading } = useChat();
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);

  const handleSelectConversation = useCallback(() => {
    setShowMobileSidebar(false);
    setShowProfile(false);
  }, []);

  const handleBackToList = useCallback(() => {
    setActiveConversation(null);
    setShowMobileSidebar(true);
    setShowProfile(false);
  }, [setActiveConversation]);

  const handleSettingsClick = useCallback(() => {
    setShowProfile(true);
    setShowMobileSidebar(false);
  }, []);

  const handleSettingsBack = useCallback(() => {
    setShowProfile(false);
    setShowMobileSidebar(true);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-navy-700">
        <LoadingSpinner size="lg" text="Loading conversations..." />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-navy-700 overflow-hidden">
      {/* Sidebar */}
      <div className={`
        w-full md:w-[380px] lg:w-[420px] shrink-0 border-r border-white/5 bg-navy-800 
        flex flex-col h-full
        transition-all duration-300 ease-out
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full absolute md:translate-x-0 md:relative'}
      `}>
        <ChatList
          onSettingsClick={handleSettingsClick}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Main content area */}
      <div className={`
        flex-1 flex flex-col h-full
        ${!showMobileSidebar ? 'translate-x-0' : 'translate-x-full absolute md:translate-x-0 md:relative'}
        w-full md:w-auto transition-all duration-300 ease-out
      `}>
        {showProfile ? (
          <ProfileSettings onBack={handleSettingsBack} />
        ) : (
          <ChatWindow onBack={handleBackToList} />
        )}
      </div>
    </div>
  );
}
