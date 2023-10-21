import * as UserData from "../data/user";
import { createErrorResponse } from "./helpers/error";
import { setToken, getToken, comparePasswords } from "../utils/crypto";
import type { UserDocument } from "../data/user";
import type { AuthenticatedRequest } from "./helpers/types";
import type { Request, Response, NextFunction } from "express";

/**
 * Generates a pair of access and renew tokens from a user id.
 * 
 * - access token is derived from the user's id and expires after 24 hours
 * - renew token is derived from the access token and expires after 7 days
 */
function _generateTokens(userId: string): { access: string, renew: string } {
	if(!userId){
		throw new Error('Missing user id.');
	}
  
	const accessToken: string = setToken(userId, { expiresIn: "24h" });
	const renewToken: string = setToken(accessToken, { expiresIn: "7d" });

/**
 * Returns a user and a pair of access and refresh tokens if created successfully.
 */
async function register(req: Request, res: Response) {
	const { username, password } = req.body;
	try {
		const user = await UserData.createUser(username, password);
		const { accessToken, refreshToken } = _generateTokens(user._id);
    
		return res.status(201).send({ user, accessToken, refreshToken });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

/**
 * Returns a user and a pair of access and renew tokens is username and password are valid.
 * 
 * The access token is derived from the user's id and expires after 24 hours and the renew
 * token is derived from the access token and expires after 7 days.
 */
async function login(req: Request, res: Response) {
	const user: UserDocument | null = await UserData.getUserByUsername(req.body.username, { secrets: true });
	if(!user){
		return createErrorResponse(res, 'Invalid authentication credentials.', 401);
	}
  
	const match = comparePasswords(req.body.password, user?.password);
	if (!match) {
		return createErrorResponse(res, 'Invalid authentication credentials.', 401);
	}

	try {
		const { access, renew } = _generateTokens(user._id);
		return res.status(200).send({ user: user, tokens: { access, renew } });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 500);
	}

}

/**
 * Adds a user to the request object if the access token is valid. Otherwise, returns an error response.
 */
async function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
	const requestToken: string | undefined = req.headers?.authorization?.split(" ")[1];
	if(!requestToken){
		return createErrorResponse(res, 'Missing auth token.', 401);
	}
	
	const decodedToken: string | null = getToken(requestToken);
	if(!decodedToken){
		return createErrorResponse(res, 'Invalid auth token.', 401);
	}
  
	const user: UserDocument | null = await UserData.getUserById(decodedToken);
	if(!user){
		return createErrorResponse(res, `User with id ${decodedToken} missing.`, 401);
	}
	
	(req as AuthenticatedRequest).user = user;
	return next();
}

/**
 * Returns a new access and renew token if the renew token is valid.
 */
async function renewAccessToken(req: Request, res: Response) {
	const { access, renew } = req.body.tokens;

	if(!access || !renew) {
		return createErrorResponse(res, 'Missing tokens.', 401);
	}

	const originalAccessToken: string | null = getToken(renew);
	if(!originalAccessToken){
		return createErrorResponse(res, 'Invalid renew token.', 401);
	}

	if(originalAccessToken !== access){
		return createErrorResponse(res, 'Access token does not match original.', 401);
	}

	const userId: string | null = getToken(originalAccessToken);
	if(!userId){
		return createErrorResponse(res, 'Invalid access token.', 401);
	}

	const user: UserDocument | null = await UserData.getUserById(userId);
	if(!user){
		return createErrorResponse(res, `User with id ${userId} missing.`, 401);
	}

	try {
		const { access, renew } = _generateTokens(user._id);
		return res.status(200).send({ tokens: { access, renew } });
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 500);
	}
}

export {
	login,
	verifyAccessToken,
	renewAccessToken
};
