import * as TodoMiddleware from "../middleware/todo";
import type { Route } from "../types/infrastructure";

const routes: Route[] = [
	{
		path: "/todos",
		method: "post",
		protected: true,
		handler: [TodoMiddleware.postTodo],
	},
	{
		path: "/todos",
		method: "get",
		handler: [TodoMiddleware.indexTodos],
	},
	{
		path: "/todos/:id",
		method: "get",
		handler: [TodoMiddleware.getTodo],
	},
	{
		path: "/todos/author/:author",
		method: "get",
		handler: [TodoMiddleware.indexTodosByAuthor],
	},
	{
		path: "/todos/:id",
		method: "patch",
		protected: true,
		handler: [TodoMiddleware.patchTodo],
	},
	{
		path: "/todos/:id",
		method: "delete",
		protected: true,
		handler: [TodoMiddleware.deleteTodo],
	}
];

export { routes };