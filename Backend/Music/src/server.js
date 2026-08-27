import app from "../src/app.js";
import connectDB from "./db/db.js";
connectDB();
app.listen(3002,()=>{
    console.log("server in running on port 3002");
})

