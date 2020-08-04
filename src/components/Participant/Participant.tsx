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
  position: object;
  participantDiameter: number;
  huddleID?: number;
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
  position,
  participantDiameter,
  huddleID,
}: ParticipantProps) {
  const Positioner = styled('div')({
    width: participantDiameter.toString() + 'px',
    height: participantDiameter.toString() + 'px',
    margin: '0px',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  });

  return (
    // TODO: convert to absolute and use {left: x, top: y}

    <Positioner style={position}>
      {/* <button onClick={clickButton}>{hear ? 'i am shut' : 'shut up'}</button> */}
      <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}>
        <ParticipantTracks
          participant={participant}
          disableAudio={disableAudio}
          enableScreenShare={enableScreenShare}
        />
      </ParticipantInfo>
    </Positioner>
  );
}

export const MemoParticipant = React.memo(Participant);
