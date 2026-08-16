import express from "express"
import morgan from "morgan"
import cookieparser from "cookie-parser"
const app=express();

app.use(morgan('dev'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieparser());

export default app;