import { postUser, getUserByUsername, indexUsers, patchUser } from "../middleware/user";
import type { Route } from "./helpers/types";

const routes: Route[] = [
	{
		path: "/users",
		method: "post",
		handler: postUser,
	},
	{
		path: "/users",
		method: "get",
		handler: indexUsers,
	},
	{
		path: "/users/:username",
		method: "get",
		handler: getUserByUsername,
	},
	{
		path: "/users/:username",
		method: "patch",
		handler: patchUser,
		protected: true
	},
];

export { routes };