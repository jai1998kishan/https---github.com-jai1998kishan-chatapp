// importing socket.io and running at 8000 port
const io = require("socket.io")(8000, {
  // cors: "*", // access to everyone
  cors: "http://localhost:5500", // access to particular
});

// for storing the use who joined the chat
let users = {};

io.on("connect", (socket) => {
  // console.log("Connected...");

  // listening the event which is fire from the client
  socket.on("user-joined", (name) => {
    // console.log(name);
    users[socket.id] = name; // saving all the users in our object
    // console.log(users);

    //server fire the event to client to display which user is join
    socket.broadcast.emit("new-user-joined", name); // socket.broad.cast send the message to all but excluded self
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      name: users[socket.id],
      message: message,
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-left", users[socket.id]);
    delete users[socket.id];
  });
});
