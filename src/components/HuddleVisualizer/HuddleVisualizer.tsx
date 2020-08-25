import React, { useState } from 'react';
import HuddleZoomedIn from '../Huddle/HuddleZoomedIn';
import HuddleZoomedOut from '../Huddle/HuddleZoomedOut';
import HuddleContent from '../Huddle/HuddleContent';
import { styled } from '@material-ui/core/styles';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';

const Outline = styled('div')({
  position: 'relative',
  height: '100%',
  // display: 'grid',
  overflow: 'hidden',

  background: '#F7F7F7',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

// Without styled containers or scroll container
export default function HuddleVisualizer() {
  const { zoomed } = useAPIContext();
  const screenSharing: boolean = useScreenShareParticipant() !== undefined;

  return (
    <Outline>
      {zoomed ? (
        screenSharing ? (
          <HuddleContent />
        ) : (
          <HuddleZoomedIn />
        )
      ) : (
        <HuddleZoomedOut />
        // huddleList.map(huddleID => {
        //   let huddleParticipants: [] = state.state[huddleID];

        //   let pos = huddlePositions[huddleList.length - 1][num++];

        //   return (
        //     <HuddleZoomedOut
        //       onClick={joinHuddle}
        //       inHuddle={parseInt(huddleID) === state.huddle}
        //       huddleID={huddleID}
        //       participants={huddleParticipants}
        //       position={pos}
        //     />
        //   );
        // })
      )}
    </Outline>
  );
}
