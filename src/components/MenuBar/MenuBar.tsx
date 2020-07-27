import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';

import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { Typography } from '@material-ui/core';

import FlipCameraButton from './FlipCameraButton/FlipCameraButton';
import LocalAudioLevelIndicator from './DeviceSelector/LocalAudioLevelIndicator/LocalAudioLevelIndicator';
import ToggleFullscreenButton from './ToggleFullScreenButton/ToggleFullScreenButton';
import AddHuddleButton from './AddHuddleButton/AddHuddleButton';
import Menu from './Menu/Menu';

import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundImage: 'linear-gradient(to right, rgba(110,179,251,0.8), rgba(153,233,141, 0.8))',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      height: '8vh',
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
        marginLeft: '2.2em',
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

export default function MenuBar(huddleState: any) {
  const classes = useStyles();
  const { URLRoomName } = useParams();
  const { user, getToken, isFetching } = useAppState();
  const { isConnecting, connect, isAcquiringLocalTracks } = useVideoContext();
  const roomState = useRoomState();

  const [name, setName] = useState<string>(user?.displayName || '');
  const [roomName, setRoomName] = useState<string>('');

  useEffect(() => {
    if (URLRoomName) {
      setRoomName(URLRoomName);
    }
  }, [URLRoomName]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = () => {
    // event.preventDefault();

    // axios.post('https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&id=dasd&user_id=sd&username=da;sdf')
    // .then(res => {
    //   console.log(res)
    // });

    // axios({
    //   method: 'post',
    //   url:
    //     'https://huddle-video.herokuapp.com/room/join?first=andy&last=jiang&id=dasd&user_id=sd&username=dasdf',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   // responseType: 'json'
    // }).then(function(response) {
    //   // console.log(response);
    // });

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
                />
              ) : (
                <Typography className={classes.displayName} variant="body1">
                  {user.displayName}
                </Typography>
              )}
              <TextField
                id="menu-room"
                label="Room"
                className={classes.textField}
                // style={{backgroundColor: "white", color: "black"}}
                value={roomName}
                onChange={handleRoomNameChange}
                margin="dense"
              />
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
          <AddHuddleButton />
          <FlipCameraButton />
          <LocalAudioLevelIndicator />
          <ToggleFullscreenButton />
          <Menu />
        </div>
      </Toolbar>
    </AppBar>
  );
}
