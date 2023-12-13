import * as UserMiddleware from "../middleware/user";
import type { Route } from "../types/infrastructure";

const BASE_PATH = "/users";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "get",
		handler: [UserMiddleware.indexUsers],
	},
	{
		path: `${BASE_PATH}/:username`,
		method: "get",
		handler: [UserMiddleware.getUserByUsername],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "patch",
		protected: true,
		handler: [UserMiddleware.patchUser],
	},
];

export { routes };