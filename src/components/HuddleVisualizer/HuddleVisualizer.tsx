import React, { useState, useEffect } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';
import useAPI from '../../hooks/useAPI/useAPI';


const MyButton = styled('button')({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  width: 120,
  padding: '0 30px',

  position: 'absolute',
});

const Container = styled('div')({
  display: 'grid',
  background: '#F7F7F7',
  gridTemplateRows: 'auto 1fr',
});

interface State {
  state: any;
  joined: boolean;
  counter: number;
  huddle: number;
}

interface HuddleVisualizerProps {
  // position: object,
  // room: any;
  // localParticipant: any;
  // participants: RemoteParticipant[];
}

// Without styled containers or scroll container
export default function HuddleVisualizer({}: // room,
// localParticipant,
// participants,
HuddleVisualizerProps) {
  // const participants: RemoteParticipant[] = useParticipants();
  // const { room } = useVideoContext();
  // const localParticipant = room.localParticipant;

  const mapping = useAPI();
  const state = mapping.state;
  const joinHuddle = mapping.joinHuddle;
  const addHuddle = mapping.addHuddle;

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

  const [zoomed, setZoomed] = useState(false);
  function toggleZoom() {
    setZoomed(!zoomed);
  }

  const huddleList: any[] = zoomed ? [state.huddle] : Object.keys(state.state);

  // percentages of window.innerHeight
  const participantDiameter: number = zoomed ? 300 : 150;

  return (
    <>
      {/* <MyButton style={{ left: 0 }} onClick={toggleZoom}>
        {zoomed ? 'Zoom out' : 'Zoom in'}
      </MyButton>
      {zoomed ? null : (
        <MyButton style={{ left: 120 }} onClick={addHuddle}>
          Add Huddle
        </MyButton>
      )} */}
      {/* <HuddleControls zoomed={zoomed} onClick={setZoomed}/> */}
      {huddleList.map(huddleID => {
        let huddleParticipants: [] = state.state[huddleID];

        let pos = huddlePositions[huddleList.length - 1][num++]

        return (
          <Huddle
            onClick={joinHuddle}
            disableAudio={parseInt(huddleID) !== state.huddle}
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
