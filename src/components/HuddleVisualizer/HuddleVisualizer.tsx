import React, { useState, useEffect } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';
import { RemoteParticipant } from 'twilio-video';

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
  room: any;
  localParticipant: any;
  participants: RemoteParticipant[];
  selectedParticipant: any;
}

// Without styled containers or scroll container
export default function HuddleVisualizer({
  room,
  localParticipant,
  participants,
  selectedParticipant,
}: HuddleVisualizerProps) {
  var stateStarter: {
    [key: string]: any;
  } = {};

  // const [huddleState, setHuddleState] = useState(stateStarter);
  // const [joined, setJoined] = useState(false);
  // const [stateCounter, setStateCounter] = useState(-1);

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
    console.log('Adding huddle...');
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

  console.log(state);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     };
  //     var url = 'https://huddle-video.herokuapp.com/room/state';
  //     url += '?id=' + room.sid;
  //     url += '&user_id=' + localParticipant.sid;
  //     fetch(url, requestOptions)
  //       .then(response => response.json())
  //       .then(data => updateState(data));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  function updateState(data: any) {
    console.log(data);
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

    console.log(data.state_counter);
    console.log(state.counter);

    setState({
      state: newState,
      joined: true,
      counter: data.state_counter,
      huddle: parseInt(data.huddle_id),
    });
  }

  const huddlePositions = [
    { left: 0, top: 0 },
    { left: window.innerWidth / 4, top: window.innerHeight / 2 },
    { left: (3 * window.innerWidth) / 4, top: window.innerHeight / 2 },
    { left: window.innerWidth / 2, top: window.innerHeight / 4 },
    { left: window.innerWidth / 2, top: (3 * window.innerHeight) / 4 },
  ];

  return (
    <>
      <MyButton onClick={addHuddle}>Add Huddle</MyButton>
      {Object.keys(state.state).map(huddle => {
        var huddleParticipants: [] = state.state[huddle];
        var tempPosition = huddlePositions[parseInt(huddle)];
        if (!tempPosition) {
          tempPosition = huddlePositions[1];
        }

        return (
          <Huddle
            onClick={joinHuddle}
            disableAudio={parseInt(huddle) !== state.huddle}
            diameter={150}
            huddleID={huddle}
            participants={huddleParticipants}
            position={tempPosition}
            selectedParticipant={selectedParticipant}
          />
        );
      })}
    </>
  );
}
