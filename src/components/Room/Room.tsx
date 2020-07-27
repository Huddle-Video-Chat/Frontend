import { styled } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import HuddleVisualizer from '../HuddleVisualizer/HuddleVisualizer';

const Outline = styled('div')({
  position: 'relative',
  height: '100%',
  display: 'grid',
  overflow: 'visible',

  background: '#F7F7F7',
  // border: '5px dashed green',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const Positioner = styled('div')({
  position: 'absolute',
});

interface State {
  state: any;
  joined: boolean;
  counter: number;
  huddle: number;
}

export default function Room() {
  // const participants: RemoteParticipant[] = useParticipants();
  // const { room } = useVideoContext();

  // console.log('participants:');
  // console.log(participants);

  return (
    <Outline>
      <Positioner style={{ left: 0, top: 0 }}>
        <HuddleVisualizer />
      </Positioner>
    </Outline>
  );
}
