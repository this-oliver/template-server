import { postTodo, getTodo, indexTodos, indexTodosByAuthor, patchTodo, deleteTodo } from "../middleware/todo";
import type { Route } from "../types/infrastructure";

const routes: Route[] = [
	{
		path: "/todos",
		method: "post",
		handler: postTodo,
		protected: true
	},
	{
		path: "/todos",
		method: "get",
		handler: indexTodos,
	},
	{
		path: "/todos/:id",
		method: "get",
		handler: getTodo,
	},
	{
		path: "/todos/author/:author",
		method: "get",
		handler: indexTodosByAuthor,
	},
	{
		path: "/todos/:id",
		method: "patch",
		handler: patchTodo,
		protected: true
	},
	{
		path: "/todos/:id",
		method: "delete",
		handler: deleteTodo,
		protected: true
	}
];

export { routes };