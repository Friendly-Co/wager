import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000/");

function connect(cb) {
    socket.on("chat", message => {
        // listen for any messages coming through
        // of type 'chat' and then trigger the
        // callback function with said message
        console.log(message);
        // trigger the callback passed in when
        // our App component calls connect
        cb(message);
    });
}

export { connect };