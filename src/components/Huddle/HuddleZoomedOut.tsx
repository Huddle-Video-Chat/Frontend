import React from 'react';
import { Participant as IParticipant } from 'twilio-video';
import { nextSquareRoot, getArrangementPositions } from '../../utils/algorithms';

import { styled } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import Tooltip from '@material-ui/core/Tooltip';

import Participant, { MemoParticipant } from '../Participant/Participant';

import useAPIContext from '../../hooks/useAPIContext/useAPIContext';

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
}

export default function HuddleZoomedOut() {
  const { state, joinHuddle, isSharing } = useAPIContext();
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
          />
        );
      })}
    </>
  );
}

function Huddle({ participants, position, huddleID, onClick, inHuddle, isSharing }: HuddleProps) {
  const size = ((window.innerHeight * 1)) / 5;
  const adjustedHuddleDiameter = (nextSquareRoot(Math.min(participants.length, 4)) + Math.sqrt(2) - 1) * size;

  const adjustedPosition = {
    left: window.innerWidth * position.left - adjustedHuddleDiameter / 2,
    top: window.innerHeight * position.top - adjustedHuddleDiameter / 2,
  };

  // adjusting the center

  const Positioner = styled('div')({
    border: inHuddle ? 'none' : '3px solid #A3B0F7',
    backgroundImage: inHuddle ? 'url("https://i.imgur.com/o4EznhC.gif")' : 'none',
    backgroundPosition: 'center',
    backgroundSize: adjustedHuddleDiameter,
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
    <Tooltip
      title={tooltipMessage}
      placement="top"
      PopperProps={{ disablePortal: true }}
      onClick={() => onClick(huddleID)}
      style={adjustedPosition}
    >
      <Positioner style={adjustedPosition}>{huddleContent()}</Positioner>
    </Tooltip>
  );
}
