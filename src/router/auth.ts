import { login, renewAccessToken } from "../middleware/auth";
import type { Route } from "./helpers/types";

const routes: Route[] = [
	{
		path: "/auth/login",
		method: "post",
		handler: login,
	},
	{
		path: "/auth/refresh",
		method: "post",
		handler: renewAccessToken,
	},
];

export { routes };