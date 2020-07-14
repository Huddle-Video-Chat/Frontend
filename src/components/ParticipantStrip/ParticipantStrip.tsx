import React from 'react';
import Participant from '../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';


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
const Grid = styled('div')({
  margin: '20px auto',
  display: 'grid',
  gridTemplateColumns: '250px 250px',
  gridRow: 'auto auto',
  gridColumnGap: '20px',
  gridRowGap: '20px',
})

/* Position and arrangement algorith lives here. 

*/


interface ParticipantStripProps {
  zoomed: boolean,
}


// Without styled containers or scroll container 
export default function ParticipantStrip({ zoomed }: ParticipantStripProps) {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  // Positions enabled by changing position to absolute inside Participant
  return (
    <>
      
        <Grid>
          <Participant
            participant={localParticipant}
            isSelected={selectedParticipant === localParticipant}
            onClick={() => setSelectedParticipant(localParticipant)}
            position={{ left: 125, top: 125 }}
          />
          {
            participants.map(participant => (
              <Participant
                key={participant.sid}
                participant={participant}
                isSelected={selectedParticipant === participant}
                onClick={() => setSelectedParticipant(participant)}
                position={{ left: 700, top: 200 }}
              />
            ))
          }
        </ Grid>
        
    </>
  );
}