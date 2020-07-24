import React, { useState } from 'react';
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import { styled } from '@material-ui/core/styles';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useHuddleParticipants from '../../hooks/useHuddleParticipants/useHuddleParticipants';


const Outline = styled('div')({
  position: 'relative',
  height: '100%',
  display: 'grid',
  overflow: 'visible',

  background: 'rgba(255, 255, 255, 0.5)',
  border: '5px dashed green',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

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

interface ButtonProps {
  onClick: () => void;
}

function ViewButton({ onClick }: ButtonProps) {
  return (
    <MyButton onClick={onClick} style={{ left: 0, top: 0 }}>
      Change view
    </MyButton>
  );
}

function HuddleButton({ onClick }: ButtonProps) {
  return (
    <MyButton onClick={onClick} style={{ left: '144px', top: 0 }}>
      Switch huddle
    </MyButton>
  );
}

function AddHuddle({ onClick }: ButtonProps) {
  return (
    <MyButton onClick={onClick} style={{ left: '432px', top: 0 }}>
      Add Huddle
    </MyButton>
  );
}

const Positioner = styled('div')({
  position: 'absolute',
});

/*
- id (int) — id of room
- user_id (int) — id of user
- huddle_id (int) — id of current huddle
- users (list: int) — list of all user ids in this room
- rooms (list: object) — list of all huddles in the room
    - id (int) — id of huddle
    - users (list: int) — list of all users in huddle
*/

// To test without main participant, without container
export default function Room() {
  const [zoomed, setZoom] = useState(true);
  const [huddle, setHuddle] = useState(1);
  const huddleParticipants = useHuddleParticipants();

  const {
    room: { localParticipant },
  } = useVideoContext();
  const { room } = useVideoContext();


  const position = zoomed ? { left: 150, top: 150 } : { left: 500, top: 150 };

  // using incorrect abstraction rn, will fix
  // const [zoomed, toggleIsZoomed] = useZoomToggle()
  const clickView = () => {
    setZoom(!zoomed);
  };

  // toggles huddle between 1, 0
  const clickHuddle = () => {
    setHuddle(1 - huddle);
  };

  const addHuddle = () => {
    console.log('Joining room ' + room.sid);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    var url = 'https://huddle-video.herokuapp.com/huddle/create';
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;

    fetch(url, requestOptions);
  };

  // const filteredList = huddleParticipants.filter(user => user.huddleID === huddleID)

  // hard coded positions, right and left side
  return (
    <Outline>
      <ViewButton onClick={clickView} />
      <HuddleButton onClick={clickHuddle} />
      <AddHuddle onClick={addHuddle} />
      <Positioner style={{ left: 0, top: 0 }}>
        <ParticipantStrip zoomed={zoomed} />
      </Positioner>
    </Outline>
  );
}
