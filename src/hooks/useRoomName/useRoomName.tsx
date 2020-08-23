import { useEffect, useState } from 'react';

const crypto = require('crypto');

export default function useRoomName() {
  const match = window.location.search.match(/roomName=(.*)&?/);
  //const [roomName, setRoomName] = useState(match ? match[1].toString() : window.sessionStorage.getItem('roomName'));
  var roomName = match ? match[1] : window.sessionStorage.getItem('roomName');
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (roomName) {
      console.log('existing room name');
      console.log(roomName);
      window.sessionStorage.setItem('roomName', roomName);
      setIsFirst(false);
    } else {
      console.log('new fresh room');
      let d = new Date();
      const text = d.toString();
      var random = Math.random().toString();
      var val = crypto
        .createHash('sha1')
        .update(text + random)
        .digest('hex');

      window.sessionStorage.setItem('roomName', val);
      roomName = val;
      setIsFirst(true);
    }
  }, [roomName]);

  return [roomName, isFirst];
}
