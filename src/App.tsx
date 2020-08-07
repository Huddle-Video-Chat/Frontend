import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';

import Controls from './components/Controls/Controls';
import Chat from './components/Chat/Chat';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import MenuBar from './components/MenuBar/MenuBar';
import ToggleZoomButton from './components/Controls/ToggleZoomButton/ToggleZoomButton';
import AddHuddleButton from './components/Controls/AddHuddleButton/AddHuddleButton';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';
import { APIProvider } from './components/APIProvider';

import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';
import Webview from './components/Webview/Webview';
import HuddleVisualizer from './components/HuddleVisualizer/HuddleVisualizer';

const Container = styled('div')({
  display: 'grid',
  background: '#F7F7F7',
  gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
  overflow: 'hidden',
  backgroundColor: '#F7F7F7',
});
export default function App() {
  const roomState = useRoomState();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  // TODO: this is really fucking stupid code need to refractor.
  return (
    <>
      {roomState === 'disconnected' ? (
        <>
          <Container style={{ height }}>
            <MenuBar />

            <Main>
              <LocalVideoPreview />
              <Controls />
            </Main>
            <ReconnectingNotification />
          </Container>
        </>
      ) : (
        <>
          <APIProvider>
            <Container style={{ height }}>
              <MenuBar />

              <Main>
                <>
                  <HuddleVisualizer />
                  {/* Consolidate the bottom three into one component */}
                  <Chat />
                  <ToggleZoomButton />
                  <AddHuddleButton />
                </>
                <Controls />
              </Main>
              <ReconnectingNotification />
            </Container>
          </APIProvider>
        </>
      )}
    </>  
  );
}
