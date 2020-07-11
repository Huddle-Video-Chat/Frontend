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
}

const Container = styled('div')({
  overflow: 'hidden',
  // border: '5px dotted red',
  borderRadius: '50%',

  backgroundColor: 'blue',

  width: '250px',
  height: '250px',
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
}: ParticipantProps) {
  return (
    // testing to see if I can change render position of participant
    <Container>
      <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}>
        <BorderTest>
          <ParticipantTracks participant={participant} disableAudio={disableAudio} enableScreenShare={enableScreenShare} />
        </BorderTest>
      </ParticipantInfo>
    </Container>
  );
}
