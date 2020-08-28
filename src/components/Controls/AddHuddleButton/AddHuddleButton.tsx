import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import useScreenShareToggle from '../../../hooks/useScreenShareToggle/useScreenShareToggle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#ffffff',
      backgroundColor: '#a7aff4 !important',
      height: '55px',
      width: '55px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      right: '95%',
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

export default function AddHuddleButton() {
  const classes = useStyles();
  const { addHuddle, zoomed } = useAPIContext();
  const [isScreenShared] = useScreenShareToggle();

  const disableAddHuddleButton = zoomed || isScreenShared;

  const tooltipMessage = zoomed ? 'Cannot add huddle while zoomed in' : 'Add Huddle';
  return (
    <div className={classes.container}>
      <Tooltip
        title={tooltipMessage}
        classes={{ tooltip: classes.noMaxWidth }}
        placement="bottom"
        PopperProps={{ disablePortal: true }}
        onClick={addHuddle}
        style={{ cursor: zoomed ? 'not-allowed' : 'pointer' }}
      >
        <div>
          <Fab className={classes.fab} disabled={disableAddHuddleButton} data-cy-audio-toggle>
            <AddCircleOutlineIcon />
          </Fab>
        </div>
      </Tooltip>
    </div>
  );
}
