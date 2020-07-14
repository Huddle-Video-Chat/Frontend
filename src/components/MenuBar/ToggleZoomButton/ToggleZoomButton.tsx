import React from 'react';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import fscreen from 'fscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

import useZoomToggle from '../../../hooks/useZoomToggle/useZoomToggle';
import { Icon } from '@material-ui/core';

export default function ToggleFullscreenButton() {
  const [isZoomed, toggleIsZoomed] = useZoomToggle()

  return (
      <button onClick = {toggleIsZoomed}>Zoom toggle</button>
  )
}
