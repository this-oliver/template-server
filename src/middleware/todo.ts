import * as TodoData from '../data/todo';
import { createErrorResponse } from './helpers/error';
import type { AuthenticatedRequest } from './helpers/types';
import type { Request, Response } from 'express';

async function _verifyAuthor(userId: string, todoId: string): Promise<boolean> {
	const todo = await TodoData.getTodo (todoId);

	if (!todo) {
		return false;
	} else if (todo.author.toString() !== userId) {
		return false;
	} else {
		return true;
	}
}

async function postTodo (req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { title, description } = authReq.body;
	try {
		const todo = await TodoData.createTodo ((authReq as AuthenticatedRequest).user._id, title, description);
		return res.status (201).send (todo);
	} catch (error) {
		return createErrorResponse (res, (error as Error).message, 400);
	}
}

async function getTodo (req: Request, res: Response) {
	const { id } = req.params;
	try {
		const todo = await TodoData.getTodo (id);
		return res.status (200).send (todo);
	} catch (error) {
		return createErrorResponse (res, (error as Error).message, 400);
	}
}

async function indexTodos (req: Request, res: Response) {
	try {
		const todos = await TodoData.indexTodos ();
		return res.status (200).send (todos);
	} catch (error) {
		return createErrorResponse (res, (error as Error).message, 400);
	}
}

async function indexTodosByAuthor (req: Request, res: Response) {
	const { author } = req.params;

	try {
		const todos = await TodoData.indexTodosByAuthor (author);
		return res.status (200).send (todos);
	} catch (error) {
		return createErrorResponse (res, (error as Error).message, 400);
	}
}

async function patchTodo (req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await _verifyAuthor(authReq.user._id, id)){
		return createErrorResponse(res, 'You are not authorized to perform this action.', 401);
	}

	try {
		const todo = await TodoData.updateTodo (id, authReq.body);
		return res.status (200).send (todo);
	} catch (error) {
		return createErrorResponse (res, (error as Error).message, 400);
	}
}

async function deleteTodo (req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await _verifyAuthor(authReq.user._id, id)){
		return createErrorResponse(res, 'You are not authorized to perform this action.', 401);
	}

	try {
		const todo = await TodoData.deleteTodo (id);
		return res.status (200).send (todo);
	} catch (error) {
		return createErrorResponse (res, (error as Error).message, 400);
	}
}

export { postTodo, getTodo, indexTodos, indexTodosByAuthor, patchTodo, deleteTodo };