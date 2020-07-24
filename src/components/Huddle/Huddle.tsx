import React, { useState } from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';
import Participant, { MemoParticipant } from '../Participant/Participant';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    huddle: {
      overflow: 'visible',
      border: '5px dashed red',
      display: 'flex',
    },
  })
);

function nextSquareRoot(num: number) {
  if (Math.floor(Math.sqrt(num)) === Math.sqrt(num)) {
    return Math.floor(Math.sqrt(num));
  } else {
    return Math.floor(Math.sqrt(num)) + 1;
  }
}

function getArrangementNumbers(size: number) {
  let num = size;
  let nsr = nextSquareRoot(num);
  let arrangement = [];
  while (num != 0) {
    let row = Math.min(nsr, num);
    num -= row;
    arrangement.push(row);
  }
  return arrangement;
}

// diameter of PARTICIPANT
function getArangementPositions(size: number, diameter: number, center: any) {
  let arrangement = getArrangementNumbers(size);
  let sizeY = -(size * diameter) / 2;
  let result: any[] = [];
  for (let row = 0; row < size; row += 1) {
    // if last row is odd
    if (row > 0 && arrangement[row] % 2 !== arrangement[row - 1] % 2) {
      // hypotnuse n math shit
      sizeY -= ((2 - Math.sqrt(3)) * diameter) / 2;
    }

    let sizeX = -(arrangement[row] * diameter) / 2;
    for (let i = 0; i < arrangement[row]; i += 1) {
      result.push({ left: sizeX + center.x - diameter / 2, top: sizeY + center.y - diameter / 2 });

      // radius math here
      sizeX += diameter;
    }

    // next level
    sizeY += diameter;
  }
  console.log('position algorithm result:');
  console.log(result);
  return result;
}

interface HuddleProps {
  participants: IParticipant[];
  position: any;
  huddleID: string;
  diameter: number;
  onClick: (huddleID: string) => void;
  selectedParticipant: any;
  disableAudio: boolean;
}

export default function Huddle({
  participants,
  position,
  huddleID,
  diameter,
  onClick,
  selectedParticipant,
  disableAudio,
}: HuddleProps) {
  const classes = useStyles();
  // // setting disableAudio to hear, clicking button toggles setHear
  // // disableAudio will need to be set by participant strip in the future.
  // function clickButton() {
  //   setHear(!hear);
  // }
  // const [hear, setHear] = useState(false);

  const adjustedHuddleDiameter = nextSquareRoot(participants.length) * 200;

  const Positioner = styled('div')({
    // overflow: 'hidden',
    border: '5px dotted green',
    borderRadius: '50%',
    backgroundColor: '#99aab5',
    width: adjustedHuddleDiameter,
    height: adjustedHuddleDiameter,
    // width: '200px',
    // height: '200px',
    position: 'absolute',
    padding: '20px',
  });

  // math stuff (nextSquareRoot(participants.length) * 100) / Math.sqrt(2)

  // second argument is diameter of PARTICIPANT
  const center = { x: position.left - adjustedHuddleDiameter / 2, y: position.top - adjustedHuddleDiameter / 2 };
  let arrangementPositions = getArangementPositions(participants.length + 1, diameter, center);

  function onParticipantClick() {}

  const adjustedPosition = {
    left: position.left - adjustedHuddleDiameter / 2,
    top: position.top - adjustedHuddleDiameter / 2,
  };

  return (
    // testing to see if I can change render position of participant

    <div onClick={huddleID => onClick} className={classes.huddle}>
      <Positioner style={adjustedPosition}>
        {participants.map(participant => {
          // adjusting for radius of circle
          const arrangedP = arrangementPositions.shift();
          return (
            <MemoParticipant
              key={participant.sid}
              participant={participant}
              isSelected={selectedParticipant === participant}
              onClick={onParticipantClick}
              position={arrangedP}
              diameter={diameter}
              disableAudio={disableAudio}
            />
          );
        })}
      </Positioner>
    </div>
  );
}
