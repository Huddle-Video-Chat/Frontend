import useRouter from 'use-react-router';
import { matchPath } from 'react-router-dom';

export default function useRoomName() {
  const match = window.location.search.match(/roomName=(.*)&?/);
  const roomName = match ? match[1] : window.sessionStorage.getItem('roomName');
  return roomName;
}
