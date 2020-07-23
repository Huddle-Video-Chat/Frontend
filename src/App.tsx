import React from 'react';
import { styled } from '@material-ui/core/styles';

import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import MenuBar from './components/MenuBar/MenuBar';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';

import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';
import useVideoContext from './hooks/useVideoContext/useVideoContext';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Container = styled('div')({
  display: 'grid',
  backgroundColor: 'white',
  gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
  overflow: 'visible',
});
export default function App() {
  const roomState = useRoomState();

  const {
    room: { localParticipant },
  } = useVideoContext();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  // Create or join room API call
  if (roomState !== 'disconnected') {
    fetch('url', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: 'name: testRoomName',
    })
      .then(r => r.json())
      .then(response => {
        const roomID = response;
      });
  }

  const [huddleState] = useState({});

  return (
    <Container style={{ height }}>
      <MenuBar />
      <Main>
        {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </Container>
  );
}
