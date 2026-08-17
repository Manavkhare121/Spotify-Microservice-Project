import express from "express"
import morgan from "morgan"
import cookieparser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
const app=express();

app.use(morgan('dev'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieparser());
app.use('/api/auth',authRoutes);

export default app;