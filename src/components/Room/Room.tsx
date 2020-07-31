import { styled } from '@material-ui/core/styles';
import React from 'react';
import HuddleVisualizer from '../HuddleVisualizer/HuddleVisualizer';


const Outline = styled('div')({
  position: 'relative',
  height: '100%',
  display: 'grid',
  overflow: 'auto',

  background: '#F7F7F7',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const Positioner = styled('div')({
  position: 'absolute',
});


export default function Room() {
  // console.log('Room');

  return (
    <Outline>
      <Positioner style={{ left: 0, top: 0 }}>
        <HuddleVisualizer />
      </Positioner>
    </Outline>
  );
}
