import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import Participant, { MemoParticipant } from '../Participant/Participant';
import { nextSquareRoot, getArrangementPositions, getArrangementPositionsZoomed } from '../../utils/algorithms';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';
import Pic from '../../img/group_icon.png';

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
  onClick: (huddleID: string) => void;
  inHuddle: boolean;
}

export default function HuddleZoomedOut({ participants, position, huddleID, onClick, inHuddle }: HuddleProps) {
  const classes = useStyles();
  const { state, isSharing } = useAPIContext();
  const size = (window.innerHeight * 1) / 5;

  const adjustedHuddleDiameter = (nextSquareRoot(Math.min(participants.length, 4)) + Math.sqrt(2) - 1) * size;
  const gridTemplateColumns = 'repeat(2, 1fr)';
  const border = '3px solid #A3B0F7';

  const center = { x: position.left - adjustedHuddleDiameter / 2, y: position.top - adjustedHuddleDiameter / 2 };
  let arrangementPositions = getArrangementPositions(participants.length + 1, size, center);

  const adjustedPosition = {
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2,
  };

  // adjusting the center

  const Positioner = styled('div')({
    border: border,
    borderRadius: '50%',
    width: adjustedHuddleDiameter,
    height: adjustedHuddleDiameter,
    position: 'absolute',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
  });

  let tooltipMessage;
  if (state.huddle === parseInt(huddleID)) {
    tooltipMessage = 'My huddle';
  } else if (isSharing) {
    tooltipMessage = 'Cannot move huddles while sharing screen';
  } else {
    tooltipMessage = 'Click to join';
  }

  function huddleClick() {
    if (!isSharing) {
      onClick(huddleID);
    }
  }

  let count = 0

  let contents
  if (participants.length > 4) {
    contents = participants.slice(0, 3).map(participant => {
      const arrangedP = arrangementPositions.shift();
      return (
        <MemoParticipant
          key={participant.sid}
          participant={participant}
          isSelected={inHuddle}
          onClick={huddleClick}
          enableScreenShare={false}
          position={arrangedP}
          size={size}
          disableAudio={!inHuddle}
        />
      )
    })

    contents.push (
      <img src="../../img/thankyou.jpeg" alt="Thank you"></img>
    )
  } else {
    contents = participants.map(participant => {
      const arrangedP = arrangementPositions.shift();
      return (
        <MemoParticipant
          key={participant.sid}
          participant={participant}
          isSelected={inHuddle}
          onClick={huddleClick}
          enableScreenShare={false}
          position={arrangedP}
          size={size}
          disableAudio={!inHuddle}
        />
      )
    })
  }

  return (
    <Tooltip
      title={tooltipMessage}
      placement="top"
      PopperProps={{ disablePortal: true }}
      onClick={() => onClick(huddleID)}
      style={adjustedPosition}
    >
      <Positioner style={adjustedPosition} >
        {contents}
      </Positioner>
    </Tooltip>
  );
}
