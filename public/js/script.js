const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//global 소켓 핸들러
socket.on('user_connected', (username) => drawChat(`${username} connected! `));
socket.on('submit_chat', (data) => {
  const { chat, username } = data;
  drawChat(`${username} : ${chat}`);
});

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = e.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawChat(`me: ${inputValue}`);
    e.target.elements[0].value = '';
  }
};

const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Strnager :)`);

const drawChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `<div>${message}</div>`;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const username = prompt('What is youre name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
