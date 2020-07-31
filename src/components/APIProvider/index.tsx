
import React, { useState, createContext, ReactNode } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

interface State {
    state: any;
    joined: boolean;
    counter: number;
    huddle: number;
}

interface IAPIContext {
    state: State,
    joinHuddle: (huddle: string) => void,
    addHuddle: () => void,
    deleteUser: () => void,
}

export const APIContext = createContext<IAPIContext>(null!)

export function APIProvider({children: ReactNode}) {
    const participants: RemoteParticipant[] = useParticipants();
    const { room } = useVideoContext();
    const localParticipant = room.localParticipant;

    const [state, setState] = useState<State>({
        state: {},
        joined: false,
        counter: 0,
        huddle: -1,
    });

    if (!state.joined) {
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

            // console.log('new state...');
            // console.log(newState);

            setState({
                state: newState,
                joined: true,
                counter: data.state_counter,
                huddle: parseInt(data.huddle_id),
            });
        }
    }

    async function joinHuddle(huddle: string) {
        if (parseInt(huddle) != state.huddle) {
            // console.log('Joining huddle...');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };

            var url = 'https://huddle-video.herokuapp.com/huddle/join';
            url += '?id=' + room.sid;
            url += '&user_id=' + localParticipant.sid;
            url += '&new_huddle_id=' + huddle;
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => updateState(data));
        }
    }

    async function addHuddle() {
        if (Object.keys(state.state).length < 6 && state.state[state.huddle].length > 1) {
            // console.log('Adding huddle...');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };

            var url = 'https://huddle-video.herokuapp.com/huddle/create';
            url += '?id=' + room.sid;
            url += '&user_id=' + localParticipant.sid;
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => updateState(data));
        }
    }

    async function deleteUser() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        var url = 'https://huddle-video.herokuapp.com/room/leave';
        url += '?id=' + room.sid;
        url += '&user_id=' + localParticipant.sid;
        fetch(url, requestOptions);
    }

    return (
        <APIContext.Provider
            value={{
                state,
                joinHuddle,
                addHuddle,
                deleteUser,
            }}
        >
        </APIContext.Provider>
    )
}

