import React, { useState, useEffect } from 'react';
import HuddleVisualizer from '../HuddleVisualizer/HuddleVisualizer';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import { RemoteParticipant } from 'twilio-video';

interface ParticipantStripProps {
  zoomed: boolean;
  position: object;
}

// Without styled containers or scroll container
export default function ParticipantStrip({ zoomed, position }: ParticipantStripProps) {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants: RemoteParticipant[] = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
  const { room } = useVideoContext();
  const [huddleID, setHuddleID] = useState('');

  return (
    <HuddleVisualizer
      localParticipant={localParticipant}
      participants={participants}
      selectedParticipant={selectedParticipant}
      room={room}
    />
  );
}
