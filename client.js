//connectivity code
const socket = io("http://localhost:8000"); // for connecting server to the client

// for name of the user who join the chat box
const name = prompt("Enter Your Name : ");

// firing the emit which is go on server
socket.emit("user-joined", name); // user defined event

//client receive the event
socket.on("new-user-joined", (name) => {
  // console.log(name);

  if (name) generateMessage("center", `${name} joined the Chat`);
});

//getting our div to display our message in it.
const first = document.querySelector(".first");

// for message generating in the UI code
function generateMessage(side, message) {
  var div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = message;

  if (side === "left") {
    div.classList.add("alert-primary");
    div.classList.add("rounded-5");
  } else if (side === "right") {
    div.classList.add("alert-secondary");
    div.classList.add("rounded-5");
  } else {
    if (message.includes("joined")) {
      div.classList.add("alert-success");
      div.classList.add("rounded-5");
    } else {
      div.classList.add("alert-danger");
      div.classList.add("rounded-5");
    }
  }

  first.appendChild(div);
}

// this line is for get the input value from the form and sending for message generate
function sentMessage() {
  // console.log("send message function is called");
  let input = document.getElementById("message");

  generateMessage("right", `${input.value} : You`);

  socket.emit("send", input.value);

  input.value = "";
}

socket.on("receive", ({ name, message }) => {
  // console.log(name);
  // console.log(message);

  if (name) generateMessage("left", `${name} : ${message}`);
});

socket.on("user-left", (name) => {
  if (name) generateMessage("center", `${name} Left the Chat`);
});
