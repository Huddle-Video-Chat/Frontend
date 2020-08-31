import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import { nextSquareRoot, getArrangementPositions } from '../../utils/algorithms';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import Tooltip from '@material-ui/core/Tooltip';
import ScreenShare from '@material-ui/icons/ScreenShare';
import Apps from '@material-ui/icons/Apps';

import Participant, { MemoParticipant } from '../Participant/Participant';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant/useScreenShareParticipant';

interface Position {
  left: number;
  top: number;
}

const huddlePositions: Position[][] = [
  [{ left: 1 / 2, top: 1 / 2 }],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 4, top: 1 / 2 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 4, top: 1 / 2 },
    { left: 3 / 4, top: 1 / 2 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 4, top: 1 / 3 },
    { left: 1 / 4, top: 2 / 3 },
    { left: 3 / 4, top: 1 / 2 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 4, top: 1 / 3 },
    { left: 1 / 4, top: 2 / 3 },
    { left: 3 / 4, top: 1 / 3 },
    { left: 3 / 4, top: 2 / 3 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 4 / 9, top: 1 / 5 },
    { left: 1 / 4, top: 1 / 2 },
    { left: 1 / 3, top: 3 / 4 },
    { left: 2 / 3, top: 3 / 4 },
    { left: 2 / 3, top: 1 / 3 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 3, top: 1 / 5 },
    { left: 1 / 5, top: 1 / 2 },
    { left: 1 / 3, top: 4 / 5 },
    { left: 2 / 3, top: 4 / 5 },
    { left: 4 / 5, top: 1 / 2 },
    { left: 2 / 3, top: 1 / 5 },
  ],
  [
    { left: 1 / 2, top: 1 / 2 },
    { left: 1 / 3, top: 1 / 5 },
    { left: 1 / 4, top: 1 / 2 },
    { left: 1 / 3, top: 4 / 5 },
    { left: 6 / 10, top: 4 / 5 },
    { left: 3 / 4, top: 7 / 10 },
    { left: 4 / 6, top: 1 / 4 },
    { left: 7 / 10, top: 1 / 6 },
  ],
];

interface HuddleProps {
  participants: IParticipant[];
  position: any;
  huddleID: string;
  onClick: (huddleID: string) => void;
  inHuddle: boolean;
  isSharing: boolean;
  bot: string;
  toggleZoomed: () => void;
}

export default function HuddleZoomedOut() {
  const { state, joinHuddle, isSharing, toggleZoomed } = useAPIContext();
  const huddleList = Object.keys(state.state);
  let num: number = 1;

  // NESTED FOR LOOPS HERE
  return (
    <>
      {huddleList.map(huddleID => {
        const huddleParticipants: [] = state.state[huddleID];

        let pos;
        if (parseInt(huddleID) === state.huddle) {
          pos = huddlePositions[huddleList.length - 1][0];
        } else {
          pos = huddlePositions[huddleList.length - 1][num++];
        }

        return (
          <Huddle
            participants={huddleParticipants}
            position={pos}
            huddleID={huddleID}
            onClick={joinHuddle}
            inHuddle={parseInt(huddleID) === state.huddle}
            isSharing={isSharing}
            bot={state.bot}
            toggleZoomed={toggleZoomed}
          />
        );
      })}
    </>
  );
}

<<<<<<< HEAD
function Huddle({ participants, position, huddleID, onClick, inHuddle, isSharing }: HuddleProps) {
  const size = ((window.innerHeight * 1)) / 5;
=======
function Huddle({ participants, position, huddleID, onClick, inHuddle, isSharing, bot, toggleZoomed }: HuddleProps) {
  const size = ((inHuddle ? 1.25 : 1) * (window.innerHeight * 1)) / 5;
>>>>>>> 1efec5049ac9ecabe1f199c80a94c6f1e0013d7b
  const adjustedHuddleDiameter = (nextSquareRoot(Math.min(participants.length, 4)) + Math.sqrt(2) - 1) * size;
  const screenShareParticipant = useScreenShareParticipant();

  const adjustedPosition = {
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2,
  };
  // adjusting the center

  const Positioner = styled('div')({
    border: inHuddle ? 'none' : '3px solid #6FB4F644',
    background: inHuddle ? 'linear-gradient(135deg, #EFE4f966, #FFE8E966);' : 'none',
    borderRadius: '50%',
    width: adjustedHuddleDiameter,
    height: adjustedHuddleDiameter,
    position: 'absolute',
    justifyItems: 'center',
    alignItems: 'center',
    // padding: '20px',
    display: 'grid',
    gridTemplateColumns: participants.length === 1 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
  });

  const ScreenShareIndicator = styled('div')({
    backgroundColor: 'pink',
    borderRadius: '50%',
    position: 'absolute',
    width: (window.innerHeight / 25).toString() + 'px',
    height: (window.innerHeight / 25).toString() + 'px',
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2.5,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  let tooltipMessage;
  if (inHuddle) {
    tooltipMessage = 'My huddle';
  } else if (isSharing) {
    tooltipMessage = 'Cannot move huddles while sharing screen';
  } else {
    tooltipMessage = 'Click to join';
  }

  function huddleClick() {
    if (!isSharing) {
      onClick(huddleID);
    }
  }

  function huddleContent() {
    const huddleParticipants = participants.length > 4 ? participants.slice(0, 3) : participants;
    let icon =
      participants.length > 4 ? (
        <div
          style={{
            borderRadius: '50%',
            backgroundColor: '#A3B0F7',
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PeopleIcon style={{ width: '5em', height: '5em' }} />
        </div>
      ) : null;

      // INNER LOOP FOR THE NESTED
    const contents = huddleParticipants.map(participant => {
      return (
        <MemoParticipant
          key={participant.sid}
          participant={participant}
          isSelected={inHuddle}
          onClick={huddleClick}
          enableScreenShare={false}
          size={size}
          disableAudio={!inHuddle}
          contentView={true}
        />
      );
    });

    if (icon) {
      contents.push(icon);
    }
    return contents;
  }

  return (
    <>
      <Tooltip
        title={tooltipMessage}
        placement="top"
        PopperProps={{ disablePortal: true }}
        onClick={() => onClick(huddleID)}
        style={adjustedPosition}
      >
        <Positioner style={adjustedPosition}>{huddleContent()}</Positioner>
      </Tooltip>
      {(screenShareParticipant || bot !== null) && (
        <Tooltip
          title={
            screenShareParticipant
              ? 'Participant is screensharing, click to zoom in'
              : 'App is being used, click to zoom in'
          }
          placement="top"
          PopperProps={{ disablePortal: true }}
          onClick={toggleZoomed}
        >
          <ScreenShareIndicator>{screenShareParticipant ? <ScreenShare /> : <Apps />}</ScreenShareIndicator>
        </Tooltip>
      )}
    </>
  );
}
