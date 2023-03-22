const socket = io('/');
const getElementById = (id) => document.getElementById(id) | null;

const helloStrangerElement = getElementById('hello_stranger');
const cgattubgBoxElement = getElementById('chatting_box');
const forElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is youre name?');
  socket.emit('new_user', username);
  socket.on('hello_user', (data) => console.log(data));
}

function init() {
  helloUser();
}

init();
