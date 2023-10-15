import { login, renewAccessToken } from "../middleware/auth";
import type { Route } from "./helpers/types";

const BASE_PATH = "/auth";

const routes: Route[] = [
	{
		path: `${BASE_PATH}/login`,
		method: "post",
		handler: login,
	},
	{
		path: `${BASE_PATH}/renew`,
		method: "post",
		handler: renewAccessToken,
	},
];

export { routes };