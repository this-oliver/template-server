import mongoose from "mongoose";
import { DATABASE_URL } from "./config/env";
import { BaseError } from "./types/infrastructure";

if(!DATABASE_URL) {
	throw new Error("Database URI not set. Set DATABASE_URL environment variable.");
}

let connection: mongoose.Connection | undefined = undefined;

/**
 * Connect to database
 */
async function connect(): Promise<typeof mongoose> {
	const database = await mongoose.connect(DATABASE_URL);
	connection = database.connection;

	return database;
}

/**
 * Disconnect from database
 */
async function disconnect() {
	await mongoose.disconnect();
	connection = undefined;
}

/**
 * Drop database
 */
async function drop () {
	if(!connection) {
		throw { status: 500, message: "no connection to database" } as BaseError;
	}

	return connection.dropDatabase();
}

export default {
	connection,
	connect,
	disconnect,
	drop
};