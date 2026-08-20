import ampq from "amqplib"
import config from "../config/config.js";
let channel, connection;
export async function connect() {
    connection=await ampq.connect(config.RABBITMQ_URI);
    channel=await connection.createChannel();
    console.log("connected to RabbitMQ");//only one channel can enough(publish channel and subscriber channel)
}

