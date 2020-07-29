import React, { useCallback, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Chat from '@material-ui/icons/Chat';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      color: '#A3B0F7',
      backgroundColor: '#f2f2f2 !important',
      height: '40px',
      width: '40px',
      boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14), -2px -1px 3px rgba(255, 255, 255, 0.74) !important',
    },
    container: {
      display: 'flex',
      position: 'absolute',
      right: '4%',
      transform: 'translate(50%, 30px)',
      top: '5%',
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
      <Tooltip title="Open Chat" placement="left" PopperProps={{ disablePortal: true }}>
        <Button className={classes.fab} onClick={openChat}>
          <Chat />
        </Button>
      </Tooltip>
    </div>
  );
}
