const socket = io();

const clientsTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});
// Listenign for an event from Backend

function sendMessage() {
  if (messageInput.value === "") {
    return;
  }
  console.log(messageInput.value);
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("message", data);
  addMessagetoUI(true, data);
  messageInput.value = "";
  //   scrollToBottom();
}
socket.on("clients-total", (data) => {
  // console.log(data);
  clientsTotal.innerText = "Ttoal clients connected: " + data;
});
socket.on("chat-message", (data) => {
  addMessagetoUI(false, data);
  console.log(data);
  //   scrollToBottom();
});

function addMessagetoUI(isOwnMessage, data) {
    clearFeedback();
  const element = `<li class="message-${isOwnMessage ? "right" : "left"}">
    <p class="message">${data.message}</p>
    <span>${data.name}  ${moment(data.dateTime).fromNow()}</span>
  </li>`;
  messageContainer.innerHTML += element;
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

messageInput.addEventListener("focus", (e) => {
  socket.emit("feedback", {
    feedback: `${nameInput.value} is typing a message...`,
  });
});
messageInput.addEventListener("keypress", (e) => {
  socket.emit("feedback", {
    feedback: `${nameInput.value} is typing a message...`,
  });
});
messageInput.addEventListener("blur", (e) => {
  socket.emit("feedback", {
    feedback: ``,
  });
});
socket.on("feedback", (data) => {
    clearFeedback();
  const element = `<li class="message-feedback">
    <p class="feedback" id="feedback">${data.feedback}  is typing</p>
  </li>`;
  messageContainer.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((e) => {
    e.parentNode.removeChild(e);
  });
}
