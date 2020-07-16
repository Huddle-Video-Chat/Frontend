import React from 'react';
import Participant from '../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import { SSL_OP_NO_QUERY_MTU } from 'constants';


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

const Outline = styled('div')({
  border: '5px dotted blue',
})

/* Position and arrangement algorith lives here. */

// Takes size of this participant strip, returns next square root
function nextSquareRoot(num: number) {
  if (Math.floor(Math.sqrt(num)) === Math.sqrt(num)) {
    return Math.floor(Math.sqrt(num))
  } else {
    return Math.floor(Math.sqrt(num)) + 1
  }
}

// // Takes size of this participant strip, returns array of how many circles are in each row. 
// // arrangement[0] has the number of circles in the first ( 0th ) row

function getArrangementNumbers(size: number) {
  let num = size
  let nsr = nextSquareRoot(num)
  let arrangement = []
  while (num != 0) {
    let row = Math.min(nsr, num)
    num -= row
    arrangement.push(row)
  }
  return arrangement
}

function getArangementPositions(size: number, diameter: number, center: any) {
  let index = 0
  let arrangement = getArrangementNumbers(size)
  let sizeY = -(size * diameter) / 2
  let result: any[] = []
  for (let row = 0; row < size; row += 1) {
    // if last row is odd
    if (row > 0 && arrangement[row] % 2 !== arrangement[row - 1] % 2) {
      // hypotnuse or some shit
      sizeY -= (2 - Math.sqrt(3)) * diameter / 2
    }

    let sizeX = -(arrangement[row] * diameter) / 2
    for (let i = 0; i < arrangement[row]; i += 1) {
      result.push({ left: sizeX + center.x, top: sizeY + center.y })

      // radius math here
      sizeX += diameter
      index += 1
    }

    // next level
    sizeY += diameter
  }

  return result
}

interface ParticipantStripProps {
  zoomed: boolean,
  position: object
}

// Without styled containers or scroll container 
export default function ParticipantStrip({ zoomed, position }: ParticipantStripProps) {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  const diameter = zoomed ? 250 : 100
  let arrangementPositions = getArangementPositions(participants.length + 1, diameter, {x: 200, y:200})

  // Positions enabled by changing position to absolute inside Participant
  // Set disableAudio 
  return (
    <>

        <Participant
          participant={localParticipant}
          isSelected={selectedParticipant === localParticipant}
          onClick={() => setSelectedParticipant(localParticipant)}
          position={arrangementPositions.shift()}
          diameter={diameter}
        />
      {
        participants.map(participant => (
          <Participant
            key={participant.sid}
            participant={participant}
            isSelected={selectedParticipant === participant}
            onClick={() => setSelectedParticipant(participant)}
            position={arrangementPositions.shift()}
            diameter={diameter}
          />
        ))
      }

    </>
  );
}