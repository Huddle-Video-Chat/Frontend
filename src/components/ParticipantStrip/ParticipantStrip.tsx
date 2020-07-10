import React from 'react';
import Participant from '../Participant/Participant';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';

import './ParticipantStrip.css'

const Container = styled('aside')(({ theme }) => ({
  padding: '0.5em',
  overflowY: 'auto',
  [theme.breakpoints.down('xs')]: {
    overflowY: 'initial',
    overflowX: 'auto',
    padding: 0,
    display: 'flex',
  },
}));

const ScrollContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
}));

// Original code
// export default function ParticipantStrip() {
//   const {
//     room: { localParticipant },
//   } = useVideoContext();
//   const participants = useParticipants();
//   const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

//   return (
//     <Container>
//       <ScrollContainer>
//         <div className = "local-cropper" >
//           <Participant
//             participant={localParticipant}
//             isSelected={selectedParticipant === localParticipant}
//             onClick={() => setSelectedParticipant(localParticipant)}
//         />
//         </div>
//         {participants.map(participant => (
//           <div className = "participant-cropper">
//             <Participant
//               key={participant.sid}
//               participant={participant}
//               isSelected={selectedParticipant === participant}
//               onClick={() => setSelectedParticipant(participant)}
//             />
//           </div>
//         ))}
//       </ScrollContainer>
//     </Container>
//   );
// }

// Without styled containers or scroll container
export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  return (
    <>
      <Participant
        participant={localParticipant}
        isSelected={selectedParticipant === localParticipant}
        onClick={() => setSelectedParticipant(localParticipant)}
      />
      {participants.map(participant => (
        <Participant
          key={participant.sid}
          participant={participant}
          isSelected={selectedParticipant === participant}
          onClick={() => setSelectedParticipant(participant)}
        />
      ))}
    </>

  );
}