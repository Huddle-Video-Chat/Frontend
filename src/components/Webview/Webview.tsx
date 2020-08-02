import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '1%',
      margin: '0px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    webview: {
      height: '85%',
      width: '80%',
      border: 'none',
      borderRadius: '25px',
    },
  })
);

export default function Webview() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <iframe className={classes.webview} src="https://skribbl.io/?wFUCybnU3EQS" />
    </div>
  );
}
