import React, { useState } from 'react';
import ParticipantInfo from '../ParticipantInfo/ParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';
import { Participant as IParticipant } from 'twilio-video';

import { styled } from '@material-ui/core/styles';

interface ParticipantProps {
  participant: IParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
  position: object;
  diameter: number;
}



interface ParticipantProps {
  participant: IParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
  position: object;
  diameter: number;
  huddleID?: number;
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
  position,
  diameter,
  huddleID,
}: ParticipantProps) {
  // setting disableAudio to hear, clicking button toggles setHear
  // disableAudio will need to be set by participant strip in the future.
  function clickButton() {
    setHear(!hear);
  }
  const [hear, setHear] = useState(false);

  const Positioner = styled('div')({
    overflow: 'hidden',
    border: '5px dotted blue',
    borderRadius: '50%',

    backgroundColor: '#99aab5',

    width: '150px',
    height: '150px',

    objectFit: 'contain',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    // left: 'auto !important',
    // top: 'auto !important',
    position: 'absolute',
  });


  return (
    // testing to see if I can change render position of participant

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
