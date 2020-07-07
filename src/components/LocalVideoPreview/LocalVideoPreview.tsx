import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '../VideoTrack/VideoTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import './LocalVideoPreview.css';
import useMousePosition from './UseMousePosition';

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name.includes('camera')) as LocalVideoTrack;

  const { x, y } = useMousePosition();
  var xPos: number = Number(x);
  var yPos: number = Number(y);

  return videoTrack ? (
    <div className="preview-wrapper">
      <VideoTrack track={videoTrack} isLocal x={xPos} y={yPos} />
    </div>
  ) : null;
}
