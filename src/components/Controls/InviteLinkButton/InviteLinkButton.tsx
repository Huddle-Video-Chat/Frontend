import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useRoomName from '../../../hooks/useRoomName/useRoomName';
import usePasscode from '../../../hooks/usePasscode/usePasscode';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';

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

export default function InviteLinkButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const roomName = useRoomName();
  const passcode = usePasscode();
  const url = window.location.href;
  const copyLink = () => {
    var placeHolder = url + '?passcode=' + passcode + '&roomName=' + roomName;
    var dummy = document.createElement('textarea');
    dummy.setAttribute('id', 'dummy_id');
    document.body.appendChild(dummy);
    document.getElementById('dummy_id')!.innerHTML = placeHolder;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  return (
    <Tooltip title={'Copy Invite'} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={classes.fab} onClick={copyLink} disabled={props.disabled}>
        <ShareIcon />
      </Fab>
    </Tooltip>
  );
}
