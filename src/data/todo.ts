import Mongoose from "mongoose";
import { Schema } from "mongoose";
import type { ITodo } from "../types";

type TodoDocument = ITodo & Mongoose.Document;

const TodoModel = Mongoose.model("todo", new Mongoose.Schema<ITodo>(
	{
		author: { type: Schema.Types.ObjectId, ref: "user", required: true },
		title: { type: String, required: true },
		description: { type: String, default: "" },
		completed: { type: Boolean, default: false }
	},
	{ timestamps: true }
));

async function createTodo(author: string, title: string, description: string): Promise<TodoDocument> {
	return await TodoModel.create(new TodoModel({ author, title, description }));
}

async function getTodo(id: string): Promise<TodoDocument | null> {
	return await TodoModel.findById(id).exec();
}

async function indexTodos(): Promise<TodoDocument[]> {
	return await TodoModel.find().exec();
}

async function indexTodosByAuthor(author: string): Promise<TodoDocument[]> {
	return await TodoModel.find({ author }).exec();
}

async function updateTodo(id: string, patch: Partial<ITodo>): Promise<TodoDocument | null> {
	const todo = await getTodo (id);

	if(!todo){
		throw new Error(`Todo with id ${id} not found`);
	}

	todo.title = patch.title || todo.title;
	todo.description = patch.description || todo.description;
	todo.completed = patch.completed !== undefined ? patch.completed : todo.completed;

	return await todo.save();
}

async function deleteTodo (id: string): Promise<TodoDocument | null> {
	return await TodoModel.findByIdAndDelete(id);
}

export { 
	TodoDocument,
	TodoModel,
	createTodo,
	getTodo,
	indexTodos,
	indexTodosByAuthor,
	updateTodo,
	deleteTodo
};
