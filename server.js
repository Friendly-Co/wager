const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./routes");
const socket = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socket(server);

// This enables CORs and ensures that our frontend,
// running on a different server can connect to our backend
io.set("origins", "*:*");
// whenever we receive a `connection` event
// our async function is then called
io.on('connection', (socket) => {
  console.log("Client with socket id || " + socket.id + ' || is now connected');
  
  // we should see this printed out whenever we have
  // a successful connection
  console.log()

  socket.on('SEND_MESSAGE', function(data) {
    io.emit("RECIEVE_MESSAGE", data);
  })
  // we then send out a new message to the
  // `chat` channel with "Hello World"
  // Our clientside should be able to see
  // this and print it out in the console

  // io.emit("chat", "this is the message from the server");



  socket.on('disconnect', () => {
    console.log("Client with socket id || " + socket.id + ' || is now connected')
  })
})

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactbettingscores",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

// Start the API server
// app.listen(PORT, function() {
//   console.log(`API Server now listening on PORT ${PORT}`);
// });

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


