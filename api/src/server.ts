import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

export const runServer = async () => {
	app.get("/", (req, res) => {
		res.send("Hello");
	});

	app.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
};
