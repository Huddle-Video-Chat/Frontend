import React, { useState, useEffect } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';
import { RemoteParticipant } from 'twilio-video';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

const MyButton = styled('button')({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',

  position: 'absolute',
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
  const participants: RemoteParticipant[] = useParticipants();
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  console.log('participants');
  console.log(participants);
  console.log('room');
  console.log(room);

  console.log('Huddle Visualizer');

  var stateStarter: {
    [key: string]: any;
  } = {};

  const [state, setState] = useState<State>({
    state: {},
    joined: false,
    counter: 0,
    huddle: -1,
  });

  async function joinHuddle(huddle: string) {
    console.log('Joining huddle...');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/huddle/join';
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    url += '&new_huddle_id=' + huddle;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  async function addHuddle() {
    if (Object.keys(state.state).length < 6) {
      console.log('Creating huddle...');
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };

      var url = 'https://huddle-video.herokuapp.com/huddle/create';
      url += '?id=' + room.sid;
      url += '&user_id=' + localParticipant.sid;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => updateState(data));
    }
  }

  if (!state.joined) {
    console.log('Joining room...');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    var url = 'https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&username=da;sdf';
    url += '&id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => updateState(data));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      var url = 'https://huddle-video.herokuapp.com/room/state';
      url += '?id=' + room.sid;
      url += '&user_id=' + localParticipant.sid;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => updateState(data));
    }, 1000);
    return () => clearInterval(interval);
  });

  function updateState(data: any) {
    if (data.state_counter !== state.counter) {
      var newState: {
        [key: string]: any;
      } = {};
      participants.map(p => {
        const huddleID: string = data.users[p.sid];
        if (newState[huddleID] === undefined) {
          newState[huddleID] = [];
        }
        newState[huddleID].push(p);
      });
      const huddleID: string = data.huddle_id;
      if (newState[huddleID] === undefined) {
        newState[huddleID] = [];
      }
      newState[huddleID].push(localParticipant);

      setState({
        state: newState,
        joined: true,
        counter: data.state_counter,
        huddle: parseInt(data.huddle_id),
      });
    }
  }

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

  return (
    <>
      <MyButton onClick={addHuddle}>Add Huddle</MyButton>
      {Object.keys(state.state).map(huddle => {
        let huddleParticipants: [] = state.state[huddle];
        // var tempPosition = huddlePositions[parseInt(huddle)];
        // if (!tempPosition) {
        //   tempPosition = huddlePositions[1];
        // }

        let pos = huddlePositions[Object.keys(state.state).length - 1][num++];

        // num++;

        return (
          <Huddle
            onClick={joinHuddle}
            disableAudio={parseInt(huddle) !== state.huddle}
            diameter={150}
            huddleID={huddle}
            participants={huddleParticipants}
            position={pos}
          />
        );
      })}
    </>
  );
}
