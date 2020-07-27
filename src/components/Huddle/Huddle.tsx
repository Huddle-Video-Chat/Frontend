import React, { useState, JSXElementConstructor } from 'react';
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
      border: '2px dashed grey',
      display: 'flex',
    },
  })
);

// trying different container styles, need to be able to pass more complex arguments for css
// interface ContainerProps {
//   diameter: number,
//   border: boolean,
//   style: object,
//   onClick: () => void,
//   contents: any,
// }

// function Container({diameter, border, style, onClick, contents} : ContainerProps) {

//   const Pos = styled('div')({
//     // overflow: 'hidden',
//     // debugging border
//     border: border ? '3px solid #A4B0F7' : 'null',
//     borderRadius: '50%',
//     // backgroundColor: '#99aab5',
//     width: diameter,
//     height: diameter,
//     position: 'absolute',
//     overflow: 'hidden',
//     justifyItems: 'center',
//     alignItems: 'center',
//     padding: '20px',

//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//   });
//   return (
//     <Pos>
//       {contents}
//     </Pos>
//   )
// }

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
  return result;
}

interface HuddleProps {
  participants: IParticipant[];
  position: any;
  huddleID: string;
  participantDiameter: number;
  onClick: (huddleID: string) => void;
  disableAudio: boolean;
}

export default function Huddle({
  participants,
  position,
  huddleID,
  participantDiameter,
  onClick,
  disableAudio,
}: HuddleProps) {
  const classes = useStyles();
  const adjustedHuddleDiameter = (nextSquareRoot(participants.length) + Math.sqrt(2) - 1) * participantDiameter;

  const center = { x: position.left - adjustedHuddleDiameter / 2, y: position.top - adjustedHuddleDiameter / 2 };
  let arrangementPositions = getArangementPositions(participants.length + 1, participantDiameter, center);

  const adjustedPosition = {
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2,
  };

  function onParticipantClick() {}
  // adjusting the center

  const Positioner = styled('div')({
    // overflow: 'hidden',
    // debugging border
    border: '3px solid #A4B0F7',
    borderRadius: '50%',
    // backgroundColor: '#99aab5',
    width: adjustedHuddleDiameter,
    height: adjustedHuddleDiameter,
    position: 'absolute',
    // overflow: 'hidden',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '20px',

    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  });

  return (
    <div onClick={() => onClick(huddleID)} className={classes.huddle}>
      <Positioner style={adjustedPosition} onClick={() => onClick(huddleID)}>
        {participants.map(participant => {
          // position does nothing atm
          const arrangedP = arrangementPositions.shift();
          return (
            <MemoParticipant
              key={participant.sid}
              participant={participant}
              isSelected={false}
              onClick={onParticipantClick}
              position={arrangedP}
              participantDiameter={participantDiameter}
              disableAudio={disableAudio}
            />
          );
        })}
      </Positioner>
    </div>
  );

  // return (
  //   // testing to see if I can change render position of participant

  //   <div onClick={() => onClick(huddleID)} className={classes.huddle}>
  //     {Container(
  //       adjustedHuddleDiameter,
  //       true,
  //       adjustedPosition,
  //       onClick(huddleID)

  //       participants.map(participant => {
  //         // adjusting for radius of circle
  //         const arrangedP = arrangementPositions.shift();
  //         return (
  //           <MemoParticipant
  //             key={participant.sid}
  //             participant={participant}
  //             isSelected={false}
  //             onClick={onParticipantClick}
  //             position={arrangedP}
  //             participantDiameter={participantDiameter}
  //             disableAudio={disableAudio}
  //           />
  //         );
  //       })

  //       )}

  //   </div>
  // );
}