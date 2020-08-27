import React from 'react';
// import { Participant as IParticipant } from 'twilio-video';
// import Participant, { MemoParticipant } from '../Participant/Participant';
// import { nextSquareRoot, getArrangementPositions, getArrangementPositionsZoomed } from '../../utils/algorithms';

// import { styled } from '@material-ui/core/styles';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import PeopleIcon from '@material-ui/icons/People';
// import Tooltip from '@material-ui/core/Tooltip';
// import Stepbro from '../../img/stepbro.png';
// import useAPIContext from '../../hooks/useAPIContext/useAPIContext';

// interface Position {
//   left: number;
//   top: number;
// }

// const huddlePositions: Position[][] = [
//   [{ left: 1 / 2, top: 1 / 2 }],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 1 / 4, top: 1 / 2 },
//   ],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 1 / 4, top: 1 / 2 },
//     { left: 3 / 4, top: 1 / 2 },
//   ],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 1 / 4, top: 1 / 3 },
//     { left: 1 / 4, top: 2 / 3 },
//     { left: 3 / 4, top: 1 / 2 },
//   ],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 1 / 4, top: 1 / 3 },
//     { left: 1 / 4, top: 2 / 3 },
//     { left: 3 / 4, top: 1 / 3 },
//     { left: 3 / 4, top: 2 / 3 },
//   ],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 4 / 9, top: 1 / 5 },
//     { left: 1 / 4, top: 1 / 2 },
//     { left: 1 / 3, top: 3 / 4 },
//     { left: 2 / 3, top: 3 / 4 },
//     { left: 2 / 3, top: 1 / 3 },
//   ],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 1 / 3, top: 1 / 5 },
//     { left: 1 / 5, top: 1 / 2 },
//     { left: 1 / 3, top: 4 / 5 },
//     { left: 2 / 3, top: 4 / 5 },
//     { left: 4 / 5, top: 1 / 2 },
//     { left: 2 / 3, top: 1 / 5 },
//   ],
//   [
//     { left: 1 / 2, top: 1 / 2 },
//     { left: 1 / 3, top: 1 / 5 },
//     { left: 1 / 4, top: 1 / 2 },
//     { left: 1 / 3, top: 4 / 5 },
//     { left: 6 / 10, top: 4 / 5 },
//     { left: 3 / 4, top: 7 / 10 },
//     { left: 4 / 6, top: 1 / 4 },
//     { left: 7 / 10, top: 1 / 6 },
//   ],
// ];

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     huddle: {
//       overflow: 'visible',
//       border: '2px dashed grey',
//       display: 'flex',
//     },
//   })
// );

// interface SpacialIndicatorProps {
//   participants: IParticipant[];
//   position: any;
//   huddleID: string;
//   onClick: (huddleID: string) => void;
//   left: boolean;
// }

// function SpacialIndicator({ participants, position, huddleID, onClick, left }: SpacialIndicatorProps) {
//   const Container = styled('div')({
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   });

//   const VideosContainer = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center'
//   });

//   const Arrow

//   return (
//     <Tooltip
//       title={tooltipMessage}
//       placement="top"
//       PopperProps={{ disablePortal: true }}
//       onClick={() => onClick(huddleID)}
//       style={adjustedPosition}
//     >
//       <Positioner style={adjustedPosition}>{huddleContent()}</Positioner>
//     </Tooltip>
//   );
// }
