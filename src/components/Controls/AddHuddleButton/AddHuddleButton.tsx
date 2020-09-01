import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import useAPIContext from '../../../hooks/useAPIContext/useAPIContext';
import Popup from 'reactjs-popup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: 'white',
      backgroundColor: '#cdadd4 !important',
      height: '55px',
      width: '55px',
      top: '15px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    // container: {
    //   display: 'flex',
    //   position: 'absolute',
    //   top: '6%',
    // },
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
    // <div className={classes.container}>
    <Tooltip
      title={tooltipMessage}
      classes={{ tooltip: classes.noMaxWidth }}
      placement="bottom"
      PopperProps={{ disablePortal: true }}
      // onClick={addHuddle}
      style={{ cursor: zoomed ? 'not-allowed' : 'pointer' }}
    >
      <div>
        <Popup
          trigger={
            <Fab className={classes.fab} disabled={disableAddHuddleButton} data-cy-audio-toggle>
              <AddCircleOutlineIcon />
            </Fab>
          }
          position="right center"
        >
          <div>Popup content here !!</div>
        </Popup>
      </div>
    </Tooltip>
    // </div>
  );
}
