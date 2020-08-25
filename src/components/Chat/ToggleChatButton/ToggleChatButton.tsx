import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Chat from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: 'white',
      backgroundColor: '#f2aab2 !important',
      height: '55px',
      width: '55px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      right: '2%',
      transform: 'translate(50%, 30px)',
      top: '3%',
    },
    maxWidth: {
      maxWidth: 'none',
    },
  })
);

interface ToggleChatButtonProps {
  openChat: () => void;
}

export default function ToggleChatButton({ openChat }: ToggleChatButtonProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Tooltip title="Open Chat" placement="bottom" PopperProps={{ disablePortal: true }} onClick={openChat}>
        <Fab className={classes.fab} onClick={openChat}>
          <Chat />
        </Fab>
      </Tooltip>
    </div>
  );
}
