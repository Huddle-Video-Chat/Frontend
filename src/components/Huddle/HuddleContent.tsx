import React from 'react';
import { MemoParticipant } from '../Participant/Participant';
import { nextSquareRoot, getArrangementPositionsZoomed } from '../../utils/algorithms';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';
import { Participant } from 'twilio-video';

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
  const screenSharingParticipant = useScreenShareParticipant();
  const participants: any[] = state.state[state.huddle];
  const size: number = (window.innerHeight * 1) / 5;

  const adjustedHuddleDiameter = (nextSquareRoot(participants.length) + Math.sqrt(2) - 1) * size;
  const gridTemplateColumns = 'repeat(' + Math.min(4, participants.length) + ', 1fr)';
  const border = 'null';

  const center = { x: adjustedHuddleDiameter / 2, y: adjustedHuddleDiameter / 2 };
  let arrangementPositions = getArrangementPositionsZoomed(participants.length + 1, size, center);

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
    left: '0px !important',
    top: '0px !important',
    display: 'flex',
    flexDirection: 'row',
    gridTemplateColumns: gridTemplateColumns,
  });

  const Content = styled('div')({
    width: '80vw',
    padding: '5%',
  });

  const ParticipantStrip = styled('div')({
    width: '20vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    padding: '5%',
  });

  return (
    <Positioner style={adjustedPosition}>
      <Content>
        {screenSharingParticipant !== undefined ? (
          <MemoParticipant
            key={screenSharingParticipant?.sid}
            participant={screenSharingParticipant}
            isSelected={true}
            onClick={onParticipantClick}
            enableScreenShare={true}
            size={window.innerHeight * 0.7}
            aspectRatio={16 / 9}
            disableAudio={false}
          />
        ) : (
          <></>
        )}
      </Content>

      <ParticipantStrip>
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
              size={size}
              disableAudio={false}
            />
          );
        })}
      </ParticipantStrip>
    </Positioner>
  );
}
