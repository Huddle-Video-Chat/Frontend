import React, { useState } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';

// Without styled containers or scroll container
export default function HuddleVisualizer() {
  const { state, joinHuddle, addHuddle, zoomed } = useAPIContext();

  interface Position {
    left: number;
    top: number;
  }

  const huddlePositions: Position[][] = [
    [{ left: 1 / 2, top: 1 / 2 }],
    [
      { left: 1 / 4, top: 1 / 2 },
      { left: 3 / 4, top: 1 / 2 },
    ],
    [
      { left: 1 / 6, top: 1 / 2 },
      { left: 1 / 2, top: 1 / 2 },
      { left: 5 / 6, top: 1 / 2 },
    ],
    [
      { left: 1 / 4, top: 1 / 4 },
      { left: 3 / 4, top: 1 / 4 },
      { left: 1 / 4, top: 3 / 4 },
      { left: 3 / 4, top: 3 / 4 },
    ],
    [
      { left: 1 / 4, top: 1 / 4 },
      { left: 3 / 4, top: 1 / 4 },
      { left: 1 / 4, top: 3 / 4 },
      { left: 3 / 4, top: 3 / 4 },
      { left: 1 / 2, top: 1 / 2 },
    ],
    [
      { left: 1 / 6, top: 1 / 4 },
      { left: 1 / 2, top: 1 / 4 },
      { left: 5 / 6, top: 1 / 4 },
      { left: 1 / 6, top: 3 / 4 },
      { left: 1 / 2, top: 3 / 4 },
      { left: 5 / 6, top: 3 / 4 },
    ],
  ];

  let num: number = 0;

  const huddleList: any[] = zoomed ? [state.huddle] : Object.keys(state.state);

  // percentages of window.innerHeight
  const participantDiameter: number = zoomed ? 300 : 150;

  return (
    <>
      {huddleList.map(huddleID => {
        let huddleParticipants: [] = state.state[huddleID];

        let pos = huddlePositions[huddleList.length - 1][num++];

        return (
          <Huddle
            onClick={joinHuddle}
            inHuddle={parseInt(huddleID) === state.huddle}
            participantDiameter={participantDiameter}
            huddleID={huddleID}
            participants={huddleParticipants}
            position={pos}
            zoomed={zoomed}
          />
        );
      })}
    </>
  );
}
