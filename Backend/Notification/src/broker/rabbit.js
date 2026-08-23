import ampq from "amqplib"
import config from "../config/config.js";
let channel, connection;
export async function connect() {
    connection=await ampq.connect(config.RABBITMQ_URI);
    channel=await connection.createChannel();
    console.log("connected to RabbitMQ");//only one channel can enough(publish channel and subscriber channel)
}

//there are many queue each queue have one specific name when u publish the queue you should have to say in which queue you are updating

export async function publishToQueue(queueName,data){
    await channel.assertQueue(queueName,{durable:true});//if the queue is not created than assertQueue will create the queue and then connect the queue or if the queue is already created than it will directly connect the queue
    await channel.sendToQueue(queueName,Buffer.from(JSON.stringify(data)));
    console.log("message sent to queue",queueName)

}

export async function subscribeToQueue(queueName,callback) {
    await channel.assertQueue(queueName,{durable:true});
    channel.consume(queueName,async (msg)=>{
        await callback(JSON.parse(msg.content.toString()));
        await channel.ack(msg);// ki service batati hai maine apna kaam kardiya hai phir uske baad yeah batati hai ki queue ki queue bo service delete karsakta hai


    })
}