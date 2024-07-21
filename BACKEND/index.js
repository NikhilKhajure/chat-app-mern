const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
require("dotenv").config();
const messageRouter = require("./routes/messageRoute");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err.message);
})


app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);





const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started At Port ${process.env.PORT}`)
})


const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});