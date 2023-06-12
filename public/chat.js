const socket = io('http://localhost:3000/chat', {
  query: { userId: 'YOUR_USER_ID' }, // Substitua pelo ID do usuário atual
});

socket.on('connect', () => {
  console.log('Connected to the server');
  
  socket.emit('getOnlineUsers');
});

socket.on('onlineUsers', (users) => {
  console.log('Online users:', users);
});

socket.on('messageReceived', (message) => {
  console.log('Received message:', message);
});

document.getElementById('message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  
  if (message) {
    socket.emit('sendMessage', { userId: 'YOUR_USER_ID', message });
    messageInput.value = '';
  }
});
