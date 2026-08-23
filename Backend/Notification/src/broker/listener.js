import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";
function startListener() {
  subscribeToQueue("user_created", async (msg) => {
    console.log("RabbitMQ MESSAGE:", msg);
    if (!msg.fullName) {
        console.log("Invalid message received:", msg);
        return;
    }
    const {
      email,
      fullName: {firstName, lastName},role
    } = msg;
    const template = `
    <h1>Welcome to Spotify Piper</h1>
    <p>Dear ${firstName} ${lastName},</p>
    <p>Thank you fro registering with Spotify Piper. We are excited to have you on board!</p>
    <p>Your role is: ${role}</p>
    <p>We hope you enjoy our services.</p>
    <br/>
    <p>Best regards,</p>
    <p>Spotify Piper Team</p>
    `;
    await sendEmail(
      email,
      "Welcome to Spotify Piper",
      "Thank you for registering with Spotify Piper.",
      template,
    );
  }); //the queue we are subscribing we should have to let u know
}
export default startListener;