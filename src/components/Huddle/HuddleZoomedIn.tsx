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

interface HuddleZoomedInProps {}

export default function HuddleZoomedIn({}: HuddleZoomedInProps) {
  const { state } = useAPIContext();
  const participants: any[] = state.state[state.huddle];
  const size = (window.innerHeight * 1) / 3;

  const adjustedHuddleDiameter = (nextSquareRoot(participants.length) + Math.sqrt(2) - 1) * size;

  const center = { x: window.innerHeight / 2, y: window.innerWidth / 2 };

  const adjustedPosition = {
    left: adjustedHuddleDiameter / 2,
    top: adjustedHuddleDiameter / 2,
  };

  function onParticipantClick() {}
  // adjusting the center

  // DOESN'T WORK ATM
  const gridTemplateColumns = () => {
    const len = participants.length;
    if (len < 2) {
      return 'repeat(1, 1fr)';
    } else if (len < 5) {
      return 'repeat(2, 1fr)';
    } else if (len < 7) {
      return 'repeat(3, 1fr)';
    } else if (len < 12) {
      return 'repeat(4, 1fr)';
    } else {
      return 'repeat(5, 1fr)';
    }
  };

  const Positioner = styled('div')({
    border: 'null',
    width: '100%',
    height: '100%',
    // position: 'absolute',
    justifyItems: 'center',
    alignItems: 'center',
    // padding: '20px',
    left: '0px !important',
    top: '0px !important',
    display: 'grid',

    gridTemplateColumns: gridTemplateColumns(),
    columnGap: '20px',
    rowGap: '20px',
  });

  return (
    <Positioner>
      {participants.map(participant => {
        return (
          <MemoParticipant
            key={participant.sid}
            participant={participant}
            isSelected={true}
            onClick={onParticipantClick}
            enableScreenShare={false}
            size={size}
            disableAudio={false}
            contentView={true}
          />
        );
      })}
    </Positioner>
  );
}
