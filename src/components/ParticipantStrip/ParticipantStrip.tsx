import React, { useState, useEffect } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';

interface ParticipantStripProps {
  zoomed: boolean;
}

// Without styled containers or scroll container
export default function ParticipantStrip({ zoomed }: ParticipantStripProps) {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
  const { room } = useVideoContext();
  const [huddleID, setHuddleID] = useState('')

  var stateStarter: {
    [key: string]: any;
  } = {};

  const [huddleState, setHuddleState] = useState(stateStarter);
  const [joined, setJoined] = useState(false);

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
        setHuddleID(huddleID)
        if (newState[huddleID] === undefined) {
          newState[huddleID] = [];
        }
        newState[huddleID].push(localParticipant);

        setJoined(true);
        setHuddleState(newState);
      });
  }
  useEffect(() => {
    setTimeout(() => {
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
          setHuddleID(huddleID)
          if (newState[huddleID] === undefined) {
            newState[huddleID] = [];
          }
          newState[huddleID].push(localParticipant);
          setJoined(true);

          if (newState !== huddleState) {
            setHuddleState(newState);
          }

          console.log(newState);
        });
    }, 1000);
  });

  // hardcoded huddle positions, very temporary
  const huddlePositions = [
    { left: window.innerWidth / 2, top: window.innerHeight / 2 },
    { left: window.innerWidth / 4, top: window.innerHeight / 2 },
    { left: (3 * window.innerWidth) / 4, top: window.innerHeight / 2 },
    { left: window.innerWidth / 2, top: window.innerHeight / 4 },
    { left: window.innerWidth / 2, top: (3 * window.innerHeight) / 4 },
  ];

  return (
    <>
      {//zoomed ?
      // zoomed in, ours in center large, don't render others
      Object.keys(huddleState).map(huddle => {
        var huddleParticipants: [] = huddleState[huddle];
        var tempPosition = huddlePositions[parseInt(huddle)];
        if (!tempPosition) {
          tempPosition = huddlePositions[1];
        }

        return (
          <Huddle
            onClick={joinHuddle}
            // diameter of the PARTICIPANT
            diameter={150}
            huddleID={huddle}
            participants={huddleParticipants}
            // center coordinates given, need to be adjusted to left right before usage
            position={tempPosition}
            selectedParticipant={selectedParticipant}
            // disabling audio for all participants not in your huddle
            disableAudio={huddleID !== huddle}
          />
        );
      })
      }
    </>
  );
}
