import React from 'react';
import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';

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
})

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


// To test without main participant, without container
export default function Room() {
  return (
    // <Container>

    // </Container>
    <ParticipantStrip />
  );
}
