const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./routes");
const socketIo = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
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


