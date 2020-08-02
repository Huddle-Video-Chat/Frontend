import React, { useCallback, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';

import useLocalVideoToggle from '../../../hooks/useLocalVideoToggle/useLocalVideoToggle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#A3B0F7',
      backgroundColor: '#F2F2F2 !important',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14), -2px -1px 3px rgba(255, 255, 255, 0.74) !important',
    },
  })
);

export default function ToggleVideoButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
  const lastClickTimeRef = useRef(0);

  const toggleVideo = useCallback(() => {
    if (Date.now() - lastClickTimeRef.current > 200) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);

  return (
    <Tooltip title={isVideoEnabled ? 'Hide Video' : 'Show Video'} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={classes.fab} onClick={toggleVideo} disabled={props.disabled}>
        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
      </Fab>
    </Tooltip>
  );
}
