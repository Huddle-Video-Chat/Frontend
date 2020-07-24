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
      color: 'white',
      backgroundColor: '#86D1BC',
      height: '50px',
      width: '50px',
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
