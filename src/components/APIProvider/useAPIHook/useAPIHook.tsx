import { RemoteParticipant } from 'twilio-video';
import { useEffect, useState } from 'react';
import { IState } from '../index'
import useParticipants from '../../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useRoomState from '../../../hooks/useRoomState/useRoomState';

// DO NOT USE THIS HOOK ANYWHERE, ONLY USED IN APIPROVIDER

interface IData {
    // TODO, make the type of data explicit
}

export default function useAPIHook() {
    const participants: RemoteParticipant[] = useParticipants();
    const roomState = useRoomState();
    const { room } = useVideoContext();
    const localParticipant = room.localParticipant;

    const [state, setState] = useState<IState>({
        state: {},
        joined: false,
        counter: 0,
        huddle: -1,
    });

    if (roomState !== 'disconnected' && !state.joined) {
        console.log('Joining room...');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        var url = 'https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&username=da;sdf';
        url += '&id=' + room.sid;
        url += '&user_id=' + localParticipant.sid;

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => updateState(data));
    }

    useEffect(() => {
        if (roomState !== 'disconnected') {
            const interval = setInterval(() => {
                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                var url = 'https://huddle-video.herokuapp.com/room/state';
                url += '?id=' + room.sid;
                url += '&user_id=' + localParticipant.sid;
                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data => updateState(data));
            }, 1000);
            return () => clearInterval(interval);
        }
    });

    function updateState(data: any) {
        if (data.state_counter !== state.counter) {
            // console.log(data);
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

            setState({
                state: newState,
                joined: true,
                counter: data.state_counter,
                huddle: parseInt(data.huddle_id),
            });
        }
    }

    return [state, updateState] as const
}