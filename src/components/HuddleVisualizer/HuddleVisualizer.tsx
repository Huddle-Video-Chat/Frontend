import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';

import HuddleZoomedIn from '../Huddle/HuddleZoomedIn';
import HuddleZoomedOut from '../Huddle/HuddleZoomedOut';
import HuddleContent from '../Huddle/HuddleContent';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';

const Outline = styled('div')({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',

  background: '#F7F7F7',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

// Without styled containers or scroll container
export default function HuddleVisualizer() {
  const { state, zoomed } = useAPIContext();
  const screenSharing: boolean = useScreenShareParticipant() !== undefined;

  return (
    <Outline>
      {zoomed ? screenSharing || state.bot !== null ? <HuddleContent /> : <HuddleZoomedIn /> : <HuddleZoomedOut />}
    </Outline>
  );
}
