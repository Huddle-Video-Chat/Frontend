import React from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';

import { styled } from '@material-ui/core/styles';

import './Participant.css';

interface ParticipantProps {
  participant: IParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
  position: object;
}

const Container = styled('div')({
  overflow: 'hidden',
  border: '5px dotted red',
  borderRadius: '50%',

  backgroundColor: 'blue',

  width: '250px',
  height: '250px',

  position: 'absolute',
})

const BorderTest = styled('div')({
  border: '5px dahsed yellow',
})

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
  position,
}: ParticipantProps) {
  return (
    // testing to see if I can change render position of participant
    <Container style={position}>
      <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}>
          <ParticipantTracks participant={participant} disableAudio={disableAudio} enableScreenShare={enableScreenShare} />
      </ParticipantInfo>
    </Container>
  );
}
