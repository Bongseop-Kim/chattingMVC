const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const cgattubgBoxElement = getElementById('chatting_box');
const forElement = getElementById('chat_form');

//global 소켓 핸들러
socket.on('user_connected', (username) =>
  console.log(`${username} connected! `),
);

const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `Hello ${username} Strnager :)`;
};

function helloUser() {
  const username = prompt('What is youre name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
