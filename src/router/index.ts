import { Router, json } from "express";
import { routes as authRoutes } from "./auth";
import { routes as userRoutes } from "./user";
import { routes as shopRoutes } from "./shop";
import { routes as productRoutes } from "./product";
import { routes as orderRoutes } from "./order";
import { verifyAccessToken } from "../middleware/auth";
import { parseFile } from "../utils/parser";
import type { Route } from "../types/infrastructure";

const router = Router();

const routes: Route[] = [
	...authRoutes,
	...userRoutes,
	...shopRoutes,
	...productRoutes,
	...orderRoutes
];

/**
 * configure routes
 */
routes.forEach((route) => {
	const preMiddleware = [];

	// parse request body as JSON unless route.json is false
	if (route.json !== false) {
		preMiddleware.push(json());
	}

	// verify access token and add authenticated user to request object. Returns 401 otherwise.
	if (route.protected) {
		preMiddleware.push(verifyAccessToken);
	}

	// look for files in the request and add them to the request object.
	if(route.upload) {
		preMiddleware.push(parseFile(route.upload.field, { maxCount: route.upload.maxCount }));
	}

	const path = `/api${route.path}`;

	router[route.method](path, ...preMiddleware, ...route.handler);
});

/**
 * catch all routes that does not exists
 */
router.get("/*", (req, res) => {
	return res.status(400).send(`[*] the resource '${req.url}' does not exists`);
});

/**
 * welcome route
 */
router.get("/", (req, res) => {
	return res.status(200).send("Welcome to the API");
});

export { router };