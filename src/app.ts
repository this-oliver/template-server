import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// middleware to enable cors
app.use(cors());

// middleware to parse json
app.use(express.json());

// middleware to log requests
app.use(morgan("dev"));

// configure routes
const router = express.Router();
router.get("/", function (req, res) {
	res.send("Hello, world!");
});
router.get("*", function (req, res) {
	res.status(404).send(`Path ${req.url} does not exist.`);
});

export default app;
