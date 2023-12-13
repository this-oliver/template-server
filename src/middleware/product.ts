import * as ProductData from '../data/product';
import { verifyShopOwner } from './helpers/authorization';
import type { Product } from '../types/logic';
import type { AuthenticatedRequest } from '../types/infrastructure';
import type { Request, Response } from 'express';

async function postProduct(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const body = req.body as Product;

	if(!await verifyShopOwner(authReq.user._id, body.shop)){
		return res.status(401).send('You are not allowed to create a product for another user\'s shop.');
	}
  
	try {
		const product = await ProductData.createProduct(body);
		return res.status(201).send(product);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function getProductById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const product = await ProductData.getProductById(id);
		return res.status(200).send(product);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexProducts(req: Request, res: Response) {
	try {
		const products = await ProductData.indexProducts();
		return res.status(200).send(products);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexProductsByShop(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const products = await ProductData.indexProductsByShop(id);
		return res.status(200).send(products);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function patchProduct(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await verifyShopOwner(authReq.user._id, id)){
		return res.status(401).send('You are not allowed to update a product that you do not own.');
	}

	try {
		const product = await ProductData.updateProduct(id, req.body);
		return res.status(200).send(product);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function deleteProduct(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await verifyShopOwner(authReq.user._id, id)){
		return res.status(401).send('You are not allowed to delete a product that you do not own.');
	}

	try {
		const product = await ProductData.deleteProduct(id);
		return res.status(200).send(product);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

export {
	postProduct,
	getProductById,
	indexProducts,
	indexProductsByShop,
	patchProduct,
	deleteProduct
};