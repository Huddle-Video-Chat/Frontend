import React, { useState } from 'react';
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';
import { ClickAwayListener } from '@material-ui/core';

import useZoomToggle from '../../hooks/useZoomToggle/useZoomToggle';

import useHuddleParticipants from '../../hooks/useHuddleParticipants/useHuddleParticipants';

import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
  gridTemplateAreas: '". participantList"',
  gridTemplateRows: '100%',
  [theme.breakpoints.down('xs')]: {
    gridTemplateAreas: '"participantList" "."',
    gridTemplateColumns: `auto`,
    gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
    gridGap: '6px',
  },
}));

const FakeParticipant = styled('div')({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const Outline = styled('div')({
  position: 'relative',
  height: '100%',
  display: 'grid',

  background: '#7289DA',
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

function ListButton({ onClick }: ButtonProps) {
  return (
    <MyButton onClick={onClick} style={{ left: '288px', top: 0 }}>
      List info
    </MyButton>
  );
}

const DummyParticipants = styled('div')({
  background: '#FF8E53',
  borderRadius: '50%',

  height: '50px',
  width: '50px',

  position: 'absolute',
});

const Positioner = styled('div')({
  position: 'absolute',
});

/* Enters room after LocalVideoPreview, renders participantStrip and MainParticipant.
Style the grid here? or inside participantStrip?
What is the difference between participants and MainParticipant?
*/

/* Original code */
/*
export default function Room() {
  return (
    <Container>
      <ParticipantStrip />
      <MainParticipant />
    </Container>
  );
}
*/

/*
- id (int) — id of room
- user_id (int) — id of user
- huddle_id (int) — id of current huddle
- users (list: int) — list of all user ids in this room
- rooms (list: object) — list of all huddles in the room
    - id (int) — id of huddle
    - users (list: int) — list of all users in huddle
*/

let jsonData = {
  id: 2,
  user_id: 1,
  huddle_id: 1,
  users: [1],
  rooms: [
    {
      id: 1,
      users: [1],
    },
  ],
};

interface RoomProps {}

// To test without main participant, without container
export default function Room() {
  const [zoomed, setZoom] = useState(true);
  const [huddle, setHuddle] = useState(1);
  const huddleParticipants = useHuddleParticipants();

  const [testList, setTestList] = useState<Array<String>>(['']);

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

  const clickList = () => {
    axios.post('google.com').then((response: any) => {
      console.log(response);
    });
    // console.log(huddleParticipants)
  };

  const huddleID = jsonData.huddle_id;

  // const filteredList = huddleParticipants.filter(user => user.huddleID === huddleID)

  // hard coded positions, right and left side
  return (
    <Outline>
      <ViewButton onClick={clickView} />
      <HuddleButton onClick={clickHuddle} />
      <ListButton onClick={clickList} />
      <Positioner style={{ left: 0, top: 0 }}>
        {/* {
          huddles.map(huddle => (
            <ParticipantStrip zoomed={huddle.zoomed} position={huddle.position}/>
          ))
        } */}
        <ParticipantStrip zoomed={zoomed} position={{ left: 0, top: 0 }} />
      </Positioner>
      {/* {zoomed ? null :
        <>
          <DummyParticipants style={{ left: 100, top: 100 }} />
          <DummyParticipants style={{ left: 150, top: 100 }} />
          <DummyParticipants style={{ left: 125, top: 150 }} />
        </>
      } */}
    </Outline>
  );
}
