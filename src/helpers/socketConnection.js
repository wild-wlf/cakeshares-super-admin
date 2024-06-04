import { io } from 'socket.io-client';
let socket = null;

export const connectionWithSocketServer = token => {
  const jwtToken = token;

  socket = io(process.env.NEXT_PUBLIC_BACKEND_ORIGIN, {
    path: '/websocket',
    auth: {
      token: jwtToken,
      type: 'admin',
    },
  });

  socket.on('connect', () => {
    console.log('User Connected');
  });

  socket.on('adminNotification', data => {
    console.log('DATA: ', data);
    window.dispatchEvent(new CustomEvent('admin_notification', { detail: data }));
  });

  socket.on('disconnect', () => {
    console.log('User disconnect');
  });
};

export const socketServer = () => socket;
