import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import Participant, { MemoParticipant } from '../Participant/Participant';
import { nextSquareRoot, getArrangementPositions } from '../../utils/algorithms';

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

interface HuddleProps {
  participants: IParticipant[];
  position: any;
  huddleID: string;
  participantDiameter: number;
  onClick: (huddleID: string) => void;
  disableAudio: boolean;
  zoomed: boolean;
}

export default function Huddle({
  participants,
  position,
  huddleID,
  participantDiameter,
  onClick,
  disableAudio,
  zoomed,
}: HuddleProps) {
  // shit, spaghetti code, need to clean up

  const classes = useStyles();
  const adjustedHuddleDiameter = (nextSquareRoot(participants.length) + Math.sqrt(2) - 1) * participantDiameter * 1.5;
  const gridTemplateColumns = zoomed ? 'repeat(' + Math.min(4, participants.length) + ', 1fr)' : 'repeat(2, 1fr)';
  const border = zoomed ? 'null' : '3px solid #A3B0F7';

  const center = { x: position.left - adjustedHuddleDiameter / 2, y: position.top - adjustedHuddleDiameter / 2 };
  let arrangementPositions = getArrangementPositions(participants.length + 1, participantDiameter, center);

  const adjustedPosition = {
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2,
  };

  function onParticipantClick() {}
  // adjusting the center

  const Positioner = styled('div')({
    // overflow: 'hidden',
    // debugging border
    border: border,
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
    gridTemplateColumns: gridTemplateColumns,
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
}
