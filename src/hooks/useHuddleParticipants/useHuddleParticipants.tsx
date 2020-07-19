import { useEffect, useState } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useParticipants from '../useParticipants/useParticipants';
import useVideoContext from '../useVideoContext/useVideoContext';

export default function useHuddleParticipants() {
  const participants = useParticipants();
  const {
    room: { localParticipant },
  } = useVideoContext();

  // Room state API call

  /*
  - id (int) — id of room
  - user_id (int) — id of user
  - huddle_id (int) — id of current huddle
  - users (list: int) — list of all user ids in this room
  - rooms (list: object) — list of all huddles in the room
      - id (int) — id of huddle
      - users (list: int) — list of all users in huddle
  */

  const APIresult = {
    id: 2,
    user_id: 'sid1',
    huddle_id: 1,
    users: ['sid1', 'sid2'],
    rooms: [
      {
        id: 1,
        users: ['sid1', 'sid2'],
      },
    ],
  };

  const rooms = APIresult.rooms;

<<<<<<< HEAD
    let userList: { participant: RemoteParticipant; huddleID: number; }[] = []
    rooms.map(huddle => {
        const huddleID = huddle.id
        const users = huddle.users
        users.map(userID => {
            // participants.map(p => {
            //     if (true) {
            //         userList.push({participant: p, huddleID: huddleID})
            //     }
            // })
            
            // need to push participant with sid === userID
            // this comes from the API. 
            userList.push({participant: participants[0], huddleID: huddleID})

            // console.log('pushed user ' + userID)
        })
    })
=======
  let userList: { participant: RemoteParticipant; huddleID: number }[] = [];
  rooms.map(huddle => {
    const huddleID = huddle.id;
    const users = huddle.users;
    users.map(userID => {
      // participants.map(p => {
      //     if (true) {
      //         userList.push({participant: p, huddleID: huddleID})
      //     }
      // })

      // need to push participant with sid === userID
      userList.push({ participant: participants[0], huddleID: huddleID });
>>>>>>> 2823ec13a70eafe99774a133676157798bad2c26

      console.log('pushed user ' + userID);
    });
  });

  // let huddleUserIDs: string[]
  // APIresult.rooms.map(huddle => {
  //     if (huddle.id == APIresult.huddle_id) {
  //         huddleUserIDs = huddle.users
  //     }
  // })

  // let huddleList
  // participants.map(p => {
  //     if (huddleUserIDs.includes('sht')) {

  //     }
  // })

  // const huddleParticipants = participants.map(p => {
  //     p.sid ===
  //     return {participant: p, huddleID: 2}
  // })

<<<<<<< HEAD
    // Returns a list of {participant: p, huddleID: huddle_id} objects
    // console.log(userList)
    return userList;
}
=======
  // Returns a list of {participant: p, huddleID: huddle_id} objects
  return userList;
}
>>>>>>> 2823ec13a70eafe99774a133676157798bad2c26
