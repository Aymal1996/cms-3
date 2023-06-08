import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io('https://devcms2.limkokwing.net/socket.io/', {
//   sid: 'i9bzppWFafyRRe0wABBg',
//   path: '/websocket',
//   autoConnect: false,
//   upgrades: ['websocket'],
//   transports: ['websocket', 'polling'],
// });

var socket = io('wss://devcms2.limkokwing.net/', {
  // note changed URL here
  path: '/socket.io',
  autoConnect: true,
  transports: ['websocket'],
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  socket.on('connect', function () {
    console.log('Connected to WS server');

    console.log(socket.connected);
  });

  socket.connect();

  socket.send('hello pratik here');

  const sendPing = () => {
    socket.emit('ping');
  };

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
}

export default App;
