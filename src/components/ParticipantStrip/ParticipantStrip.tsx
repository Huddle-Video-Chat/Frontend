import React, { useState } from 'react';
import Participant from '../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useHuddleParticipants from '../../hooks/useHuddleParticipants/useHuddleParticipants';
import useMouseDown from '../../hooks/useMouseDown/useMouseDown';

import axios from 'axios';


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

const Positioner = styled('div')({
  position: 'absolute',
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
      // hypotnuse n math shit
      sizeY -= (2 - Math.sqrt(3)) * diameter / 2
    }

    let sizeX = -(arrangement[row] * diameter) / 2
    for (let i = 0; i < arrangement[row]; i += 1) {
      result.push({ left: sizeX + center.left, top: sizeY + center.top })

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
  // position: object,
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

  const modified = useHuddleParticipants()

  const diameter = zoomed ? 300 : 170

  // center needs an x, y pair, not left, top
  let arrangementPositions = getArangementPositions(modified.length + 1, diameter, position)

  function clickParticipant(participant: any) {
    setSelectedParticipant(participant)
    console.log(participant)
  }


  const APIresult = {
    id: 2,
    user_id: 'sid1',
    huddle_id: 1,
    users: [
      'sid1',
      'sid2',
    ],
    rooms: [
      {
        id: 1,
        users: [
          'sid1',
          'sid2'
        ]
      },
    ]
  }

  const [thisHuddleID, setThisHuddleID] = useState(APIresult.huddle_id)

  function switchHuddle() {
    setThisHuddleID(1 - thisHuddleID)
  }
  // call room state at participant strip layer

  // console.log('localparticipant in participant strip: ')
  // console.log(localParticipant)

  const md = useMouseDown()
  console.log('mouseDown: ' + md)

  // const { x, y } = useMousePosition();
  // var xPos: number = Number(x);
  // var yPos: number = Number(y);



  // arrangementPositions.shift()
  // Positions enabled by changing position to absolute inside Participant
  // Set disableAudio
  return (
    <>
      <Participant
        participant={localParticipant}
        isSelected={selectedParticipant === localParticipant}
        onClick={() => clickParticipant(localParticipant)}
        position={arrangementPositions.shift()}
        diameter={diameter}
        huddleID={thisHuddleID}
      />
      {/*ONLY MAP THE PARTICIPANTS IN YOUR HUDDLE*/}
      {
        participants.map(participant => (
          <Participant
            key={participant.sid}
            participant={participant}
            isSelected={selectedParticipant === participant}
            onClick={() => clickParticipant(participant)}
            position={arrangementPositions.shift()}
            diameter={diameter}
          />
        ))
      }
      {/* {
        modified.map(p => {
          if (p.huddleID === thisHuddleID) {
            return (
              <Participant
                key={p.participant.sid}
                participant={p.participant}
                isSelected={selectedParticipant === p.participant}
                onClick={() => clickParticipant(p.participant)}
                position={arrangementPositions.shift()}
                diameter={diameter}
              />
            )
          }
        })
      } */}
    </>
  );
}