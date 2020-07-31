import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import useZoomToggle from '../../../hooks/useZoomToggle/useZoomToggle'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            margin: theme.spacing(1),
            color: '#a7aff4',
            backgroundColor: '#f2f2f2 !important',
            height: '40px',
            width: '40px',
            boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.14), -2px -1px 3px rgba(255, 255, 255, 0.74) !important',
        },
        container: {
            display: 'flex',
            position: 'absolute',
            right: '95%',
            transform: 'translate(50%, 30px)',
            top: '5%',
        },
        noMaxWidth: {
            maxWidth: 'none',
        },
    })
);


/* <Fab className={classes.fab} onClick={() => props.onClick(!props.zoomed)} data-cy-audio-toggle>
        {props.zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
      </Fab> */

export default function AddHuddleButton() {
    const classes = useStyles()
    const [zoomed, zoomToggle] = useZoomToggle()

    return (
        <div className={classes.container}>
            <Tooltip
                title={'Add Huddle'}
                placement="bottom"
                PopperProps={{ disablePortal: true }}
                onClick={() => (console.log(zoomed))}
                classes={{ tooltip: classes.noMaxWidth }}
            >

                <Fab className={classes.fab} data-cy-audio-toggle>
                    <AddCircleOutlineIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}
