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
  diameter: number, 
}




// More api info on the materials UI thing, want to eliminate the wrapper div
// What the actual fuck does Omit<> do??????
interface ContainerProps {
  diameter: number,
}

// const Container = styled(
//   ({ diameter, ...other }: ContainerProps) => (
//     <div {...other}></div>
//   ),
// )({
//   overflow: 'hidden',
//   border: '5px dotted red',
//   borderRadius: '50%',

//   backgroundColor: '#99aab5',

//   width: (props: ContainerProps) => props.diameter,
//   height: (props: ContainerProps) => props.diameter,

//   // Uncomment to use position rather than CSS grid, for grid and position algorithm
//   // position: 'absolute',
// })

const Container = styled('div')({
  overflow: 'hidden',
  border: '5px dotted red',
  borderRadius: '50%',

  backgroundColor: '#99aab5',

  width: '250px',
  height: '250px',

  // Uncomment to use position rather than CSS grid, for grid and position algorithm
  position: 'absolute',
})

const Positioner = styled('div')({
  border: '5px dashed green',
  position: 'absolute',
})

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
  position,
  diameter,
}: ParticipantProps) {


  // setting disableAudio to hear, clicking button toggles setHear
  // disableAudio will need to be set by participant strip in the future.
  function clickButton() {
    setHear(!hear)
    console.log('hear: ' + hear)
  }
  const [hear, setHear] = useState(false)

  return (
    // testing to see if I can change render position of participant
    // 
      <Container style = {position}>
        <button onClick={clickButton}>{hear ? 'i am shut' : 'shut up'}</button>
        <ParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}>
          <ParticipantTracks participant={participant} disableAudio={hear} enableScreenShare={enableScreenShare} />
        </ParticipantInfo>
      </Container>
  );
}
