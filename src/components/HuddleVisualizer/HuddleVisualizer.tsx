import React, { useState, useEffect } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';
import { RemoteParticipant } from 'twilio-video';

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

  function sleep(ms: number) {
    console.log('sleeping');
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < ms);
  }

  const [huddleState, setHuddleState] = useState(stateStarter);
  const [joined, setJoined] = useState(false);
  const [stateCounter, setStateCounter] = useState(-1);

  async function joinHuddle(huddle: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://huddle-video.herokuapp.com/huddle/join';
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    url += '&new_huddle_id' + huddle;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  if (!joined) {
    console.log('Joining room ' + room.sid);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    var url = 'https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&username=da;sdf';
    url += '&id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    // var state_counter: number = -1;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
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

        setStateCounter(data.state_counter);
        setJoined(true);
        setHuddleState(newState);
      });
    refresh();
  }
  function refresh() {
    setTimeout(function() {
      console.log('refreshing state');
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      var url = 'https://huddle-video.herokuapp.com/room/state';
      url += '?id=' + room.sid;
      url += '&user_id=' + localParticipant.sid;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.state_counter !== stateCounter) {
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

            setStateCounter(data.state_counter);
            setHuddleState(newState);
          }
        });

      refresh();
    }, 2000);
  }

  const huddlePositions = [
    { left: 0, top: 0 },
    { left: window.innerWidth / 4 - 200, top: window.innerHeight / 2 - 200 },
    { left: (3 * window.innerWidth) / 4, top: window.innerHeight / 2 },
    { left: window.innerWidth / 2, top: window.innerHeight / 4 },
    { left: window.innerWidth / 2, top: (3 * window.innerHeight) / 4 },
  ];

  return (
    <>
      {Object.keys(huddleState).map(huddle => {
        var huddleParticipants: [] = huddleState[huddle];
        var tempPosition = huddlePositions[parseInt(huddle)];
        if (!tempPosition) {
          tempPosition = huddlePositions[1];
        }

        return (
          <Huddle
            onClick={joinHuddle}
            // diameter of the participant
            diameter={150}
            huddleID={huddle}
            participants={huddleParticipants}
            position={tempPosition}
            selectedParticipant={selectedParticipant}
            disableAudio={false}
          />
        );
      })}
    </>
  );
}
