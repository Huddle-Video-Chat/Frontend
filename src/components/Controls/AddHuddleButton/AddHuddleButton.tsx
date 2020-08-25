import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#ffffff',
      backgroundColor: '#a7aff4 !important',
      height: '5vh',
      width: '5vh',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      top: '6%',
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
  const { addHuddle, zoomed, isSharing } = useAPIContext();

  const disableAddHuddleButton = zoomed || isSharing;

  let tooltipMessage;
  if (zoomed) {
    tooltipMessage = 'Cannot add huddle while zoomed in';
  } else if (isSharing) {
    tooltipMessage = 'Cannot add huddle while sharing screen';
  } else {
    tooltipMessage = 'Add huddle';
  }

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
