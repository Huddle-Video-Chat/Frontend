import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      right: '15px',
      // transform: 'translate(50%, 30px)',
      top: '9%',
      backgroundColor: '#EDAAB7',
      width: '270px',
      height: '85%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0% 2%',
      margin: '20px',
      borderRadius: '15px',
      boxShadow: '4px 4px 17px rgba(0, 0, 0, 0.13)',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButton: {
      height: '5vh',
    },
    closeIcon: {},
    title: {
      flexGrow: 3,
      alignSelf: 'center',
    },
    messageListContainer: {
      flexGrow: 94,
      overflow: 'scroll',
    },
    senderContainer: {
      flexGrow: 3,
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginTop: '5%',
    },
    messageData: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0px',
    },
    messageBody: {
      margin: '0px',
    },
    h1: {
      margin: '0px',
      textAlign: 'center',
      color: '#ffffff',
    },
    h2: {
      margin: '0px',
    },
    p: {
      margin: '0px',
    },
  })
);

interface ChatBoxProps {
  closeChat: () => void;
}
interface Chat {
  username: string;
  body: string;
}

export default function ChatBox({ closeChat }: ChatBoxProps) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const classes = useStyles();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [body, setBody] = useState<string>('');

  const messagesEndRef = useRef(document.createElement('div'));

  useEffect(() => {
    const interval = setInterval(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      var url = 'https://huddle-video.herokuapp.com/messages/get';
      url += '?id=' + room.sid;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => setMessages(data));
    }, 2000);
    return () => clearInterval(interval);
  });

  // useEffect(() => {
  //   messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  // });

  const handleSubmit = (e: any) => {
    if (e.keyCode === 13) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      var url = 'https://huddle-video.herokuapp.com/messages/send';
      url += '?id=' + room.sid;
      url += '&username=' + localParticipant.identity;
      url += '&body=' + body;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => setMessages(data));

      setBody('');
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <Button onClick={closeChat} className={classes.closeButton}>
          <Close className={classes.closeIcon} />
        </Button>
        <h1 className={classes.h1}>Chat</h1>
      </div>

      <div className={classes.messageListContainer} ref={messagesEndRef}>
        {messages.map(message => (
          <div className={classes.messageContainer}>
            <div className={classes.messageData}>
              <h2 className={classes.h2}>{message.username}</h2>
              {/* <p>8:00 p.m.</p> */}
            </div>
            <div className={classes.messageBody}>
              <p className={classes.p}>{message.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.senderContainer}>
        {/* <form onSubmit={handleSubmit}> */}
        <TextField
          id="menu-name"
          label="Message"
          // className={classes.textField}
          value={body}
          onKeyDown={handleSubmit}
          onChange={handleNameChange}
          margin="dense"
        />
        {/* </form> */}
      </div>
    </div>
  );
}
