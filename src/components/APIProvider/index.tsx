import React, { createContext, ReactNode } from 'react';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useAPIHook from './useAPIHook/useAPIHook';
import useZoomToggle from './useZoomToggle/useZoomToggle';

export interface IState {
  state: any;
  joined: boolean;
  counter: number;
  huddle: number;
}

interface IAPIContext {
  state: IState;
  joinHuddle: (huddle: string) => void;
  addHuddle: () => void;
  deleteUser: () => void;

  zoomed: boolean;
  toggleZoomed: () => void;
}

interface APIProviderProps {
  children: ReactNode;
}

export const APIContext = createContext<IAPIContext>(null!);

export function APIProvider({ children }: APIProviderProps) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const [ zoomed, toggleZoomed ] = useZoomToggle();
  const [ state, updateState ] = useAPIHook();

  async function joinHuddle(huddle: string) {
    if (parseInt(huddle) !== state.huddle) {
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

  return (
    <APIContext.Provider
      value={{
        state,
        joinHuddle,
        addHuddle,
        deleteUser,
        zoomed,
        toggleZoomed,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}