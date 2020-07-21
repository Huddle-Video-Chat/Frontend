import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '../VideoTrack/VideoTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { styled } from '@material-ui/core/styles';

// import useMousePosition from './UseMousePosition';
import useMousePosition from '../../hooks/useMousePosition/useMousePosition';

const Container = styled('div')({
  overflow: 'hidden',
  borderRadius: '50%',
  width: '500px',
  height: '500px',
  // backgroundColor: "green",
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  display: 'flex',
  justifyContent: 'center',

  position: 'absolute',
});

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name.includes('camera')) as LocalVideoTrack;

  // const { x, y } = useMousePosition();
  // var xPos: number = Number(x);
  // var yPos: number = Number(y);

  /* Original code
  return videoTrack ? (
    <div className="preview-wrapper" >
      <VideoTrack track={videoTrack} isLocal x={xPos} y={yPos} />
    </div>
  ) : null;
  */

  /* working preview wrapper hardcoded 250px to center the mouse */
  /*
  return videoTrack ? (
    <div className = "preview-wrapper" style = {{left: xPos-250, top: yPos-250}}>
        <VideoTrack track={videoTrack} isLocal x={xPos} y={yPos} />
    </div>
  ) : null;
  */

  // Hardcoded -250 for radius
  return videoTrack ? (
    <Container style={{ left: window.innerWidth/2 - 250, top: window.innerHeight/2 - 250 }}>
      <VideoTrack track={videoTrack} isLocal />
    </Container>
  ) : null;
}
