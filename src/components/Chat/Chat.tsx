import React from 'react';

import { useState } from 'react';
import ToggleChatButton from './ToggleChatButton/ToggleChatButton';
import ChatBox from './ChatBox/ChatBox';

export default function Chat() {
  const [chatOpen, setChatOpen] = useState(false);

  function openChat() {
    setChatOpen(true);
  }

  function closeChat() {
    setChatOpen(false);
  }

  return <>{chatOpen ? <ChatBox closeChat={closeChat} /> : <ToggleChatButton openChat={openChat} />}</>;
}
