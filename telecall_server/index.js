const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
app.use(cors());
const PORT = process.env.PORT || 3059;
app.get('/', (req, res) => {
	res.send('Running');
});

var users = [];

io.on('connection', (socket) => {
    connected(socket);
    me(socket);
    call(socket);
    answer(socket);
    get_message(socket);
    disconnect(socket);

});

const connected = (socket) => {
    called_user = false;
    socket.on("user connected", async (user) => {
        if(users.length > 0){
            users.forEach(item => {
                if(item.caller_id === null && item.room_id === user.room_id){
                    item.caller_id = user.user_id;
                    item.caller_socket_id = socket.id;
                    called_user = true;
                    io.to(socket.id).emit("new_user_connected", {
                        connected_user: user.user_id,
                        socket_id: socket.id,
                    });
                }
            })
        }
        if(!called_user){
            await users.push({
                user_id: user.user_id,
                socket_id: socket.id,
                room_id: user.room_id,
                caller_id: null,
                caller_socket_id: null,
            });
        }
        console.log(users);
    });
}

const me = (socket) => {
    socket.emit("me", socket.id);
}

const call = (socket) => {
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });
    // users.forEach(user => {
    //     if(user.socket_id === socket.id){
    //         socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    //             io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    //         });
    //     }
    //     if(user.caller_socket_id === socket.id){
    //         socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    //             io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    //         });
    //     }
    // })
}

const answer = (socket) => {
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
}

const get_message = (socket) => {
    socket.on('message', msg => {
        private_message(socket, msg);
    })
}

const private_message = (socket, msg) => {
    users.forEach(user => {
        if(user.socket_id === socket.id){
            socket.to(user.caller_socket_id).emit("private message", {
                mesaj: msg.mesaj,
                id: `${socket.id}`,
            });
        }
        if(user.caller_socket_id === socket.id){
            socket.to(user.socket_id).emit("private message", {
                mesaj: msg.mesaj,
                id: `${socket.id}`,
            });
        }
    })
    
}

const disconnect = (socket) => {
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });
}

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
