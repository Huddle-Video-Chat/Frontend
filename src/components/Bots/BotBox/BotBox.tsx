import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import BotCard from '../BotCard/BotCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '*::-webkit-scrollbar': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
    '*::-webkit-scrollbar': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    container: {
      position: 'absolute',
      left: '15px',
      // transform: 'translate(50%, 30px)',
      top: '9%',
      backgroundColor: '#A3B0F6',
      width: '250px',
      height: '85%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0% 2%',
      margin: '20px',
      borderRadius: '15px',
      boxShadow: '4px 4px 17px rgba(0, 0, 0, 0.13)',
      zIndex: 3,
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '10%',
    },
    closeButton: {
      height: '5vh',
    },
    closeIcon: {},
    title: {
      flexGrow: 3,
      alignSelf: 'center',
    },
    listContainer: {
      flexGrow: 94,
      overflow: 'scroll',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginTop: '5%',
      overflowX: 'hidden',
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

interface BotsBoxProps {
  closeBots: () => void;
}
interface Chat {
  username: string;
  body: string;
}

export default function BotsBox({ closeBots }: BotsBoxProps) {
  const { room } = useVideoContext();
  const localParticipant = room.localParticipant;

  const classes = useStyles();
  const messagesEndRef = useRef(document.createElement('div'));

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <Button onClick={closeBots} className={classes.closeButton}>
          <Close className={classes.closeIcon} />
        </Button>
        <h1 className={classes.h1}>Bots</h1>
      </div>

      <div className={classes.listContainer} ref={messagesEndRef}>
        <BotCard
          name={'codenames'}
          title="Codenames"
          icon="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToIQcwpI9EpcnVf0qiTI5fg82GqY25rhSPcg&usqp=CAU"
        />
        <p style={{ textAlign: 'center' }}>More bots coming soon!</p>
      </div>
    </div>
  );
}
