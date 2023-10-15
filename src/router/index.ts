import { Router } from "express";
import { routes as authRoutes } from "./auth";
import { routes as userRoutes } from "./user";
import { routes as todoRoutes } from "./todo";
import { verifyAccessToken } from "../middleware/auth";

const BASE_PATH = "/api";

const router = Router();
const routes = [...authRoutes, ...userRoutes, ...todoRoutes];

routes.forEach((route) => {
	const path = `${BASE_PATH}${route.path}`;
  
	if (route.protected) {
		router[route.method](path, verifyAccessToken, route.handler);
	} else {
		router[route.method](path, route.handler);
	}
});

router.get("/*", (req, res) => {
	return res.status(400).send(`[*] the resource '${req.url}' does not exists`);
});

export { router };