import express from "express";
import cors from "cors";
import musicRoutes from "./routes/music.routes.js"
import cookieParser from "cookie-parser";
const app=express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/music',musicRoutes)
export default app;
