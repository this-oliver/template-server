import * as UserData from "../data/user";
import { BUCKET_S3_URI } from "../config/env";
import { createErrorResponse } from "./helpers/error";
import { BasicBucket } from "../utils/storage";
import { generateWebTokens } from "../utils/crypto";
import type { AuthenticatedRequest } from "../types/infrastructure";
import type { Request, Response } from "express";

/**
 * Returns a user and a pair of access and refresh tokens if created successfully.
 */
async function postUser(req: Request, res: Response) {
	const { username, password } = req.body;
  
	try {
		const user = await UserData.createUser({ username, password });
		const { accessToken, refreshToken } = generateWebTokens(user.id);
    
		return res.status(201).send({ user, accessToken, refreshToken });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function getUserByUsername(req: Request, res: Response) {
	const { username } = req.params;

	try {
		const user = await UserData.getUserByUsername(username);
		return res.status(200).send(user);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function indexUsers(req: Request, res: Response) {
	try {
		const users = await UserData.indexUsers();
		return res.status(200).send(users);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function patchUser(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
  
	const { id } = authReq.params;

	if(authReq.user._id !== id){
		return createErrorResponse(res, 'You are not authorized to perform this action.', 401);
	}

	let avatar: string | undefined = undefined;

	if(authReq.file){
		try {
			avatar = await (new BasicBucket({ endpoint: BUCKET_S3_URI })).uploadFile(authReq.file);
		} catch (error) {
			return createErrorResponse(res, `Failed to upload avatar (${(error as Error).message})`, 400);
      
		}
	}
  
	try {
		const user = await UserData.updateUser((authReq as AuthenticatedRequest).user._id, { ...authReq.body, avatar });
		return res.status(200).send(user);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

export { postUser, getUserByUsername, indexUsers, patchUser };
