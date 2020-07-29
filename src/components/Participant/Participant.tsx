import React, { useState } from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';

import { styled } from '@material-ui/core/styles';

// interface ParticipantProps {
//   participant: IParticipant;
//   disableAudio?: boolean;
//   enableScreenShare?: boolean;
//   onClick: () => void;
//   isSelected: boolean;
//   position: object;
//   diameter: number;
// }

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
    //overflow: 'hidden',
    // border: '2px dotted blue',

    // backgroundColor: '#99aab5',

    // hardcoded width and height
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
    // testing to see if I can change render position of participant

    <Positioner style={position}>
      {/* <button onClick={clickButton}>{hear ? 'i am shut' : 'shut up'}</button> */}
      {/* <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}> */}
      <ParticipantTracks participant={participant} disableAudio={disableAudio} enableScreenShare={enableScreenShare} />
      {/* </ParticipantInfo> */}
    </Positioner>
  );
}

export const MemoParticipant = React.memo(Participant);
