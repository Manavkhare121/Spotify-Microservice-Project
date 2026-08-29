import app from "../src/app.js";
import connectDB from "./db/db.js";
import http from 'http';
import initSocketServer from "./sockets/socket.server.js";

const httpServer = http.createServer(app);

connectDB();
initSocketServer(httpServer);

httpServer.listen(3002, () => {
    console.log("server in running on port 3002");
});

