import React from 'react';
import useRoomState from '../../../hooks/useRoomState/useRoomState';

export default function AddHuddleButton() {
  const roomState = useRoomState();

  return (
    <>
      {roomState !== 'disconnected' && (
        <>
          <button>add huddle</button>
        </>
      )}
    </>
  );
}
