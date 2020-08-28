const crypto = require('crypto');

export default function useRoomName() {
  const match = window.location.search.match(/roomName=(.*)&?/);
  const roomName = match ? match[1] : window.sessionStorage.getItem('roomName');

  if (roomName) {
    window.sessionStorage.setItem('roomName', roomName);
    return roomName;
  } else {
    let d = new Date();
    const text = d.toString();
    var random = Math.random().toString();
    var val = crypto
      .createHash('sha1')
      .update(text + random)
      .digest('hex');

    window.sessionStorage.setItem('roomName', val);

    return val;
  }
}
