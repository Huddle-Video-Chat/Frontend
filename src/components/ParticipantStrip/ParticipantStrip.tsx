import React, { useState, useEffect } from 'react';
import HuddleVisualizer from '../HuddleVisualizer/HuddleVisualizer';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import { RemoteParticipant } from 'twilio-video';

/* Original code with container and scroll container
Renders yourself as a normal participant as selected participant = local participant */

/*
const Container = styled('aside')(({ theme }) => ({
  padding: '0.5em',
  overflowY: 'auto',
  [theme.breakpoints.down('xs')]: {
    overflowY: 'initial',
    overflowX: 'auto',
    padding: 0,
    display: 'flex',
  },
}));

const ScrollContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
}));

export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  return (
    <Container>
      <ScrollContainer>
        <div className = "local-cropper" >
          <Participant
            participant={localParticipant}
            isSelected={selectedParticipant === localParticipant}
            onClick={() => setSelectedParticipant(localParticipant)}
        />
        </div>
        {participants.map(participant => (
          <div className = "participant-cropper">
            <Participant
              key={participant.sid}
              participant={participant}
              isSelected={selectedParticipant === participant}
              onClick={() => setSelectedParticipant(participant)}
            />
          </div>
        ))}
      </ScrollContainer>
    </Container>
  );
}
*/

/* This is where the grid layout will need to live and maybe the circle cropper for participant. */
// const Grid = styled('div')({
//   margin: '20px auto',
//   display: 'grid',
//   gridTemplateColumns: '250px 250px',
//   gridRow: 'auto auto',
//   gridColumnGap: '20px',
//   gridRowGap: '20px',
// });

// const Positioner = styled('div')({
//   position: 'absolute',
// });

/* Position and arrangement algorith lives here. */

// Takes size of this participant strip, returns next square root

// // Takes size of this participant strip, returns array of how many circles are in each row.
// // arrangement[0] has the number of circles in the first ( 0th ) row

//   return result;
// }

interface ParticipantStripProps {
  zoomed: boolean;
  position: object;
}

// Without styled containers or scroll container
export default function ParticipantStrip({ zoomed, position }: ParticipantStripProps) {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants: RemoteParticipant[] = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
  const { room } = useVideoContext();
  const [huddleID, setHuddleID] = useState('');

  return (
    <HuddleVisualizer
      localParticipant={localParticipant}
      participants={participants}
      selectedParticipant={selectedParticipant}
      room={room}
    />
  );
}
