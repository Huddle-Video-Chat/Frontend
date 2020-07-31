
import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useAPIHook from './useAPIHook/useAPIHook'


export interface IState {
    state: any;
    joined: boolean;
    counter: number;
    huddle: number;
}

interface APIProviderProps {
    children: ReactNode
}

interface IAPIContext {
    state: IState,
    joinHuddle: (huddle: string) => void,
    addHuddle: () => void,
    deleteUser: () => void,
}

export const APIContext = createContext<IAPIContext>(null!)

export function APIProvider({children} : APIProviderProps) {
    const { room } = useVideoContext();
    const localParticipant = room.localParticipant;

    const [ state, updateState ] = useAPIHook()

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

