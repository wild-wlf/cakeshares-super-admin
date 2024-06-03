import { io } from 'socket.io-client';
let socket = null;

const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;
console.log(SOCKET_URL);

export const connectionWithSocketServer = (token, ...rest) => {
  const jwtToken = token;
  socket = io(SOCKET_URL, {
    auth: {
      token: jwtToken,
      type: 'user',
    },
  });

  socket.on('connect', () => {
    console.log('User Connected');
  });

  socket.on('admin_notification', data => {
    console.log('DATA: ', data);
    window.dispatchEvent(new CustomEvent('admin_notification', { detail: data }));
  });

  socket.on('disconnect', () => {
    console.log('User disconnect');
  });
};

export const socketServer = () => socket;
