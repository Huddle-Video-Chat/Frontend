import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '../VideoTrack/VideoTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition'
import { styled } from '@material-ui/core/styles';

const Container = styled('div')({
  overflow: 'hidden',
  borderRadius: '50%',
  width: '300px',
  height: '300px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
});

const Outline = styled('div')({
  overflow: 'hidden',
  borderRadius: '50%'
})

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name.includes('camera')) as LocalVideoTrack;

  const mousePosition = useMousePosition()

  // Hardcoded -150 for radius
  return videoTrack ? (
    <Container style={{ left: window.innerWidth / 2 - 150, top: window.innerHeight / 2 - 150 }}>
      <VideoTrack track={videoTrack} isLocal />
    </Container>
  ) : null;
}
