import React from 'react';
import { MemoParticipant } from '../Participant/Participant';
import { nextSquareRoot, getArrangementPositionsZoomed, getArrangementPositions } from '../../utils/algorithms';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    huddle: {
      overflow: 'visible',
      border: '2px dashed grey',
      display: 'flex',
    },
  })
);

interface HuddleProps {}

export default function HuddleZoomedIn({}: HuddleProps) {
  const classes = useStyles();
  const { state } = useAPIContext();
  const participants: any[] = state.state[state.huddle];
  const size = (window.innerHeight * 1) / 3;

  const adjustedHuddleDiameter = (nextSquareRoot(participants.length) + Math.sqrt(2) - 1) * size;
  const gridTemplateColumns = 'repeat(' + Math.min(4, participants.length) + ', 1fr)';
  const border = 'null';

  const center = { x: window.innerHeight / 2, y: window.innerWidth / 2 };
  // let arrangementPositions = getArrangementPositionsZoomed(participants.length + 1, size, center);

  let arrangementPositions = getArrangementPositions(participants.length, size, center);

  const adjustedPosition = {
    left: adjustedHuddleDiameter / 2,
    top: adjustedHuddleDiameter / 2,
  };

  function onParticipantClick() {}
  // adjusting the center

  const Positioner = styled('div')({
    border: border,
    borderRadius: '0%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '20px',
    left: '0px !important',
    top: '0px !important',
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
  });

  return (
    <Positioner style={adjustedPosition}>
      {participants.map(participant => {
        // position does nothing atm
        const arrangedP = arrangementPositions.shift();
        return (
          <MemoParticipant
            key={participant.sid}
            participant={participant}
            isSelected={true}
            onClick={onParticipantClick}
            enableScreenShare={false}
            position={arrangedP}
            size={size}
            disableAudio={false}
          />
        );
      })}
    </Positioner>
  );
}
