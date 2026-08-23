import app from "../src/app.js";
import { connect } from "./broker/rabbit.js";
import startListener from "./broker/listener.js";
connect().then(startListener)
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})