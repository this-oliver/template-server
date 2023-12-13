import * as ShopData from '../data/shop';
import { verifyShopOwner } from './helpers/authorization';
import type { Shop } from '../types/logic';
import type { AuthenticatedRequest } from '../types/infrastructure';
import type { Request, Response } from 'express';

async function postShop(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const body = req.body as Shop;

	if(authReq.user._id !== body.owner){
		return res.status(401).send('You are not allowed to create a shop for another user.');
	}
  
	try {
		const shop = await ShopData.createShop(body);
		return res.status(201).send(shop);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function getShopById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const shop = await ShopData.getShopById(id);
		return res.status(200).send(shop);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexShops(req: Request, res: Response) {
	try {
		const shops = await ShopData.indexShops();
		return res.status(200).send(shops);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexShopsByOwner(req: Request, res: Response) {
	const { owner } = req.params;

	try {
		const shops = await ShopData.indexShopsByOwner(owner);
		return res.status(200).send(shops);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function patchShop(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await verifyShopOwner(authReq.user._id, id)){
		return res.status(401).send('You are not allowed to update a shop that you do not own.');
	}

	try {
		const shop = await ShopData.updateShop(id, authReq.body);
		return res.status(200).send(shop);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function deleteShop(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await verifyShopOwner(authReq.user._id, id)){
		return res.status(401).send('You are not allowed to delete a shop that you do not own.');
	}

	try {
		const shop = await ShopData.deleteShop(id);
		return res.status(200).send(shop);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

export {
	postShop,
	getShopById,
	indexShops,
	indexShopsByOwner,
	patchShop,
	deleteShop
};