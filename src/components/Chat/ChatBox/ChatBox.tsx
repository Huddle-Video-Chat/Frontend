import React, { useCallback, useRef, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { Fab, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      right: '7.5%',
      transform: 'translate(50%, 30px)',
      top: '3%',
      backgroundColor: '#86D1BC',
      width: '15vw',
      height: '94vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '1%',
      margin: '0px',
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
      flexGrow: 10,
      alignSelf: 'center',
    },
    messageListContainer: {
      flexGrow: 80,
      overflow: 'scroll',
    },
    senderContainer: {
      flexGrow: 10,
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

export default function ChatBox({ closeChat }: ChatBoxProps) {
  const classes = useStyles();
  const body =
    'This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. The default is 0 1 auto, but if you set it with a single number value, it’s like 1 0.';
  const [messages, setMessages] = useState([
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'albert', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
    { username: 'andyjiang', body: body },
  ]);

  const messagesEndRef = useRef(document.createElement('div'));

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  });

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
        <TextField
          id="menu-name"
          label="Message"
          // className={classes.textField}
          // value={name}
          // onChange={handleNameChange}
          margin="dense"
        />
      </div>
    </div>
  );
}
