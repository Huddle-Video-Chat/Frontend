import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Tooltip from '@material-ui/core/Tooltip';

import useZoomToggle from '../../../hooks/useZoomToggle/useZoomToggle';
import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#cdadd4',
      backgroundColor: '#f2f2f2 !important',
      height: '40px',
      width: '40px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14), -2px -1px 3px rgba(255, 255, 255, 0.74) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      right: '50%',
      transform: 'translate(50%, 30px)',
      top: '5%',
    },
    noMaxWidth: {
      maxWidth: 'none',
    },
  })
);

/* <Fab className={classes.fab} onClick={() => props.onClick(!props.zoomed)} data-cy-audio-toggle>
        {props.zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
      </Fab> */

export default function ToggleZoomButton() {
  const classes = useStyles();
  const { zoomed, toggleZoomed } = useAPIContext();

  return (
    <div className={classes.container}>
      <Tooltip
        title={zoomed ? 'Zoom out' : 'Zoom in'}
        classes={{ tooltip: classes.noMaxWidth }}
        placement="bottom"
        PopperProps={{ disablePortal: true }}
        onClick={toggleZoomed}
      >
        <Fab className={classes.fab} data-cy-audio-toggle>
          {zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
        </Fab>
      </Tooltip>
    </div>
  );
}
