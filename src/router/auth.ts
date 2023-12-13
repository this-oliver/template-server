import { postUser } from "../middleware/user";
import { login, refreshAccessToken } from "../middleware/auth";
import type { Route } from "../types/infrastructure";

const BASE_PATH = "/auth";

const routes: Route[] = [
	{
		path: `${BASE_PATH}/register`,
		method: "post",
		handler: postUser
	},
	{
		path: `${BASE_PATH}/login`,
		method: "post",
		handler: login,
	},
	{
		path: `${BASE_PATH}/refresh`,
		method: "post",
		handler: refreshAccessToken,
	},
];

export { routes };