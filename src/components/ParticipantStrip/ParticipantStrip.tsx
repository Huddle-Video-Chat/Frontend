import React, { useState } from 'react';
import Huddle from '../Huddle/Huddle';
import { styled } from '@material-ui/core/styles';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import useHuddleParticipants from '../../hooks/useHuddleParticipants/useHuddleParticipants';
import useMouseDown from '../../hooks/useMouseDown/useMouseDown';

// import axios from 'axios';

/* Original code with container and scroll container
Renders yourself as a normal participant as selected participant = local participant */

/*
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

export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  return (
    <Container>
      <ScrollContainer>
        <div className = "local-cropper" >
          <Participant
            participant={localParticipant}
            isSelected={selectedParticipant === localParticipant}
            onClick={() => setSelectedParticipant(localParticipant)}
        />
        </div>
        {participants.map(participant => (
          <div className = "participant-cropper">
            <Participant
              key={participant.sid}
              participant={participant}
              isSelected={selectedParticipant === participant}
              onClick={() => setSelectedParticipant(participant)}
            />
          </div>
        ))}
      </ScrollContainer>
    </Container>
  );
}
*/

/* This is where the grid layout will need to live and maybe the circle cropper for participant. */
// const Grid = styled('div')({
//   margin: '20px auto',
//   display: 'grid',
//   gridTemplateColumns: '250px 250px',
//   gridRow: 'auto auto',
//   gridColumnGap: '20px',
//   gridRowGap: '20px',
// });

// const Positioner = styled('div')({
//   position: 'absolute',
// });

/* Position and arrangement algorith lives here. */

// Takes size of this participant strip, returns next square root

// // Takes size of this participant strip, returns array of how many circles are in each row.
// // arrangement[0] has the number of circles in the first ( 0th ) row

//   return result;
// }

interface ParticipantStripProps {
  // position: object,
  zoomed: boolean;
  position: object;
}

// Without styled containers or scroll container
export default function ParticipantStrip({ zoomed, position }: ParticipantStripProps) {
  console.log('participant strip...')
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
  const { room } = useVideoContext();

  // const modified = useHuddleParticipants()

  var stateStarter: {
    [key: string]: any;
  } = {};

  const [huddleState, setHuddleState] = useState(stateStarter);
  const [joined, setJoined] = useState(false);

  // function clickParticipant(participant: any) {
  //   setSelectedParticipant(participant)
  //   console.log(participant)
  // }


  
  async function joinHuddle(huddle: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    var url = 'https://aqueous-woodland-13891.herokuapp.com/huddle/join';
    url += '?id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;
    url += '&new_huddle_id' + huddle;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  

  if (!joined) {
    console.log('Joining room ' + room.sid);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    var url = 'https://aqueous-woodland-13891.herokuapp.com/room/join?first=andy&last=jiang&username=da;sdf';
    url += '&id=' + room.sid;
    url += '&user_id=' + localParticipant.sid;

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        var newState: {
          [key: string]: any;
        } = {};

        participants.map(p => {
          const huddleID: string = data.users[p.sid];
          if (newState[huddleID] === undefined) {
            newState[huddleID] = [];
          }
          newState[huddleID].push(p);
        });

        const huddleID: string = data.huddle_id;
        if (newState[huddleID] === undefined) {
          newState[huddleID] = [];
        }
        newState[huddleID].push(localParticipant);

        setJoined(true);
        setHuddleState(newState);
        console.log('new state: ')
        console.log(newState);
      });
  } else {
    // const requestOptions = {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // };
    // var url = 'https://aqueous-woodland-13891.herokuapp.com/room/state';
    // url += '?id=' + room.sid;
    // url += '&user_id=' + localParticipant.sid;
    // fetch(url, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {
    //     var newState: {
    //       [key: string]: any,
    //     } = {};
    //     participants.map(p => {
    //       const huddleID: string = data.users[p.sid]
    //       if (newState[huddleID] === undefined) {
    //         newState[huddleID] = []
    //       }
    //       newState[huddleID].push(p)
    //     })
    //     const huddleID: string = data.huddle_id
    //     if (newState[huddleID] === undefined) {
    //       newState[huddleID] = []
    //     }
    //     newState[huddleID].push(localParticipant)
    //     setJoined(true);
    //     setHuddleState(newState);
    //     console.log(newState)
    //   });
  }



  const diameter = zoomed ? 300 : 170;

  function getPosition(huddleID: string) {
    return { left: parseInt(huddleID) * 500, top: 300 };
  }

  
  const huddlePositions = [
    {left: 0, top: 0},
    {left: window.innerWidth / 4, top: window.innerHeight / 2},
    {left: 3 * window.innerWidth / 4, top: window.innerHeight / 2},
    {left: window.innerWidth / 2, top: window.innerHeight / 4},
    {left: window.innerWidth / 2, top: 3 * window.innerHeight / 4},
  ]


  return (
    <>
      {//zoomed ?
      // zoomed in, ours in center large, don't render others
      Object.keys(huddleState).map(huddle => {
        console.log('huddle thing:')
        console.log(huddle)
        console.log('huddle state')
        console.log(huddleState)
        var huddleParticipants: [] = huddleState[huddle];
        const tempPosition = huddlePositions[parseInt(huddle)];

        return (
          <Huddle
            onClick={joinHuddle}
            // diameter of the participant
            diameter={150}
            huddleID={huddle}
            participants={huddleParticipants}
            position={tempPosition}
            selectedParticipant={selectedParticipant}
          />
        );
      })
      // <>
      //   <Participant
      //     participant={localParticipant}
      //     isSelected={selectedParticipant === localParticipant}
      //     onClick={() => clickParticipant(localParticipant)}
      //     position={arrangementPositions.shift()}
      //     diameter={diameter}
      //   // huddleID={thisHuddleID}
      //   />
      //   {/*ONLY MAP THE PARTICIPANTS IN YOUR HUDDLE*/}
      //   {
      //     participants.map(participant => (
      //       <Participant
      //         key={participant.sid}
      //         participant={participant}
      //         isSelected={selectedParticipant === participant}
      //         onClick={() => clickParticipant(participant)}
      //         position={arrangementPositions.shift()}
      //         diameter={diameter}
      //       />
      //     ))
      //   }
      //   {/* {
      //     newState[thisHuddleID].map((participant: any) => (
      //       <Participant
      //         key={participant.sid}
      //         participant={participant}
      //         isSelected={selectedParticipant === participant}
      //         onClick={() => clickParticipant(participant)}
      //         position={arrangementPositions.shift()}
      //         diameter={diameter}
      //       />
      //     ))
      //   } */}
      // </>
      // :
      // // zoomed out, ours in the center, others on the edges
      // <>
      //   <Participant
      //     participant={localParticipant}
      //     isSelected={selectedParticipant === localParticipant}
      //     onClick={() => clickParticipant(localParticipant)}
      //     position={arrangementPositions.shift()}
      //     diameter={diameter}
      //   // huddleID={thisHuddleID}
      //   />
      //   {
      //     participants.map(participant => (
      //       <Participant
      //         key={participant.sid}
      //         participant={participant}
      //         isSelected={selectedParticipant === participant}
      //         onClick={() => clickParticipant(participant)}
      //         position={arrangementPositions.shift()}
      //         diameter={diameter}
      //       />
      //     ))
      //   }

      //   {/* other positions, other huddles*/}
      //   {
      //     otherParticipants.map(participant => (
      //       <Participant
      //         key={participant.sid}
      //         participant={participant}
      //         isSelected={selectedParticipant === participant}
      //         onClick={() => clickParticipant(participant)}
      //         position={arrangementPositions.shift()}
      //         diameter={diameter}
      //       />
      //     ))
      //   }
      // </>
      }
    </>
  );
}
