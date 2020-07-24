import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { useState } from 'react';
import ToggleChatButton from './ToggleChatButton/ToggleChatButton';
import ChatBox from './ChatBox/ChatBox';

export default function Chat() {
  const [chatOpen, setChatOpen] = useState(true);

  function openChat() {
    setChatOpen(true);
  }

  function closeChat() {
    setChatOpen(false);
  }

  return <>{chatOpen ? <ChatBox closeChat={closeChat} /> : <ToggleChatButton openChat={openChat} />}</>;
}
