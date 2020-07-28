import React, { useState, useEffect } from 'react';
import HuddleVisualizer from '../HuddleVisualizer/HuddleVisualizer';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant';
import { RemoteParticipant } from 'twilio-video';

interface ParticipantStripProps {
  zoomed: boolean;
}

// Without styled containers or scroll container
export default function ParticipantStrip({ zoomed }: ParticipantStripProps) {
  // const {
  //   room: { localParticipant },
  // } = useVideoContext();
  const participants: RemoteParticipant[] = useParticipants();
  // const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
  const { room } = useVideoContext();
  // const [huddleID, setHuddleID] = useState('');

  console.log('participants:');
  console.log(participants);

  return <HuddleVisualizer />;
}
