import { styled } from '@material-ui/core/styles';
import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';

interface ParticipantProps {
  participant: IParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
  position?: object;
  size: number;
  aspectRatio?: number;
  huddleID?: number;
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
  position,
  size,
  aspectRatio,
  huddleID,
}: ParticipantProps) {
  const Positioner = styled('div')({
    width: aspectRatio !== undefined ? (size * aspectRatio).toString() + 'px' : size.toString() + 'px',
    height: size.toString() + 'px',
    margin: '0px',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: enableScreenShare ? '5%' : '50%',
    overflow: 'hidden',
  });

  return (
    // TODO: convert to absolute and use {left: x, top: y}

    <Positioner style={position !== undefined ? position : {}}>
      {/* <button onClick={clickButton}>{hear ? 'i am shut' : 'shut up'}</button> */}
      {/* <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}> */}
      <ParticipantTracks participant={participant} disableAudio={disableAudio} enableScreenShare={enableScreenShare} />
      {/* </ParticipantInfo> */}
    </Positioner>
  );
}

export const MemoParticipant = React.memo(Participant);
