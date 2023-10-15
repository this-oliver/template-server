import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router";

const app = express();

// middleware to enable cors
app.use(cors());

// middleware to parse json
app.use(express.json());

// middleware to log requests
app.use(morgan("dev"));

// configure routes
app.use(router);

export default app;
