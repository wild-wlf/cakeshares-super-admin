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

  socket.on('online-users', data => {
    const { onlineUsers } = data;
    window.dispatchEvent(new CustomEvent('online_users', { detail: [...onlineUsers] }));
  });


  socket.on('reaction-added', async data => {
    if (socket && data) {
      window.dispatchEvent(new CustomEvent('reaction-added', { detail: { ...data } }));
    }
  });

  socket.on('added-group-reaction', async data => {
    if (socket && data) {
      window.dispatchEvent(new CustomEvent('added-group-reaction', { detail: { ...data } }));
    }
  });


  socket.on('seen-message-response', data => {
    window.dispatchEvent(new CustomEvent('seen_message_response', { detail: { ...data } }));
  });



  socket.on('com-message-history', data => {
    window.dispatchEvent(new CustomEvent('com_message_history', { detail: { ...data } }));
  });

  socket.on('pool-response', data => {
    window.dispatchEvent(new CustomEvent('pool_response', { detail: { ...data } }));
  });

  socket.on('join-channel-room', data => {
    socket.emit('joinRoom', data);
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

export const startChat = data => {
  if (socket && data) {
    socket.emit('startChat', data);
  }
};

export const endChat = data => {
  if (socket && data) {
    socket.emit('endChat', data);
  }
};

export const joinGroupChat = data => {
  if (socket && data) {
    socket.emit('joinGroupChat', data);
  }
};

export const leaveGroupChat = data => {
  if (socket && data) {
    socket.emit('leaveGroupChat', data);
  }
};


export const setSeenMessage = data => {
  if (data && socket) {
    socket?.emit('get-seen-message', data);
  }
};

export const sendGroupReaction = data => {
  if (socket && data) {
    socket.emit('group-reaction', data);
  }
};

export const sendComMsg = data => {
  if (data && socket) {
    socket?.emit('send-com-msg', data);
  }
};

export const setComSeenMsg = data => {
  if (data && socket) {
    socket?.emit('send-com-seen-msg', data);
  }
};

export const castPoolVote = data => {
  if (data && socket) {
    socket?.emit('cast-pool-vote', data);
  }
};

export const clearPoolVotes = data => {
  if (data && socket) {
    socket?.emit('clear-pool-votes', data);
  }
};
