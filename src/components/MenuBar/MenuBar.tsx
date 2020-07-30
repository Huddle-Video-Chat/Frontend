import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';

import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useRoomName from '../../hooks/useRoomName/useRoomName';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography } from '@material-ui/core';

import FlipCameraButton from './FlipCameraButton/FlipCameraButton';
import LocalAudioLevelIndicator from './DeviceSelector/LocalAudioLevelIndicator/LocalAudioLevelIndicator';
import ToggleFullscreenButton from './ToggleFullScreenButton/ToggleFullScreenButton';
import AddHuddleButton from './AddHuddleButton/AddHuddleButton';
import Menu from './Menu/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundImage: 'linear-gradient(to left, #F6AAB0, #A3B0F7)',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
    },
    toolbar: {
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    rightButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        marginLeft: '0em',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: 200,
      // backgroundColor: "white",
      borderRadius: '10px',
      // color: "black"
    },
    loadingSpinner: {
      marginLeft: '1em',
    },
    displayName: {
      margin: '1.1em 0.6em',
      minWidth: '200px',
      fontWeight: 600,
    },
    joinButton: {
      margin: '1em',
    },
  })
);
export function getRoomName() {
  const match = window.location.search.match(/roomName=(.*)&?/);
  const roomName = match ? match[1] : window.sessionStorage.getItem('roomName');
  return roomName;
}

export default function MenuBar(huddleState: any) {
  const classes = useStyles();
  const { URLRoomName } = useParams();
  const { user, getToken, isFetching } = useAppState();
  const { isConnecting, connect, isAcquiringLocalTracks } = useVideoContext();
  const roomState = useRoomState();
  // const passedRoomName = useRoomName();

  const [name, setName] = useState<string>(user?.displayName || '');
  const [roomName, setRoomName] = useState<string>(useRoomName());

  useEffect(() => {
    console.log(roomName);
    if (roomName) {
      setRoomName(roomName);
    }
  }, [roomName]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRoomName(event.target.value);
  // };

  const handleSubmit = () => {
    getToken(name, roomName).then(token => connect(token));
  };

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar className={classes.toolbar}>
        {roomState === 'disconnected' ? (
          // Connected menu bar
          <div>
            <form className={classes.form} onSubmit={handleSubmit}>
              {window.location.search.includes('customIdentity=true') || !user?.displayName ? (
                <TextField
                  id="menu-name"
                  label="Name"
                  className={classes.textField}
                  value={name}
                  onChange={handleNameChange}
                  margin="dense"
                  variant="outlined"
                />
              ) : (
                <Typography className={classes.displayName} variant="body1">
                  {user.displayName}
                </Typography>
              )}
              {/* <TextField
                id="menu-room"
                label="Room"
                className={classes.textField}
                // style={{backgroundColor: "white", color: "black"}}
                value={roomName}
                onChange={handleRoomNameChange}
                margin="dense"
              /> */}
              <Button
                className={classes.joinButton}
                type="submit"
                onClick={handleSubmit}
                // color="white"
                // sty
                style={{ color: 'black', backgroundColor: 'white' }}
                variant="contained"
                disabled={isAcquiringLocalTracks || isConnecting || !name || !roomName || isFetching}
              >
                Join Room
              </Button>
              {(isConnecting || isFetching) && <CircularProgress className={classes.loadingSpinner} />}
            </form>
          </div>
        ) : (
          // Connected menu bar
          <h3>{roomName}</h3>
        )}
        <div className={classes.rightButtonContainer}>
          <FlipCameraButton />
          <LocalAudioLevelIndicator />
          <ToggleFullscreenButton />
          <Menu />
        </div>
      </Toolbar>
    </AppBar>
  );
}
