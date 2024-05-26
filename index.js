const express = require('express')
const app = express();
// const httpServer = require('http').createServer(app);
// const io =  require('socket.io')(httpServer);

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let connections = [];

io.on("connect", (socket) =>{
    connections.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on("draw", (data)=>{
        connections.forEach((con) => {
            if(con.id !== socket.id){
                con.emit("draw", {x : data.x, y : data.y});
            }
        })
    })

    socket.on("down", (data)=>{
        connections.forEach((con) => {
            if(con.id !== socket.id){
                con.emit("down", {x : data.x, y : data.y});
            }
        })
    })

    socket.on("disconnect", (reason) =>{
        console.log(`${socket.id} is disconnected`);
        connections = connections.filter((con) => con.id !== socket.id);
    });
})

app.use(express.static('public'))

let port = process.env.PORT || 8000;
server.listen(port, ()=> {console.log(`server started on ${port}`)});
