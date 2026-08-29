import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cookie from "cookie";

function initSocketServer(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    // Socket authentication
    io.use((socket, next) => {

        const cookies = cookie.parse(
            socket.handshake.headers.cookie || ""
        );

        const token = cookies.token;

        if (!token) {
            return next(
                new Error("Authentication error")
            );
        }

        try {

            const decoded = jwt.verify(
                token,
                config.JWT_SECRET
            );

            socket.user = decoded;

            next();

        } catch (err) {

            console.log("Socket Auth Error:", err);

            return next(
                new Error("Authentication error")
            );
        }
    });


    // Connection
    io.on("connection", (socket) => {

        console.log(
            "User connected:",
            socket.user.id
        );

        // Join user's own room
        socket.join(socket.user.id);


        // Play music
        socket.on("play", (data) => {

            const musicId = data.musicId;

            socket.broadcast
                .to(socket.user.id)
                .emit("play", {
                    musicId
                });

        });


        // Disconnect
        socket.on("disconnect", () => {

            console.log(
                "User disconnected:",
                socket.user.id
            );

        });

    });

    return io;
}

export default initSocketServer;