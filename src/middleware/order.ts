import * as OrderData from '../data/order';
import { verifyShopOwner } from './helpers/authorization';
import type { Order } from '../types/logic';
import type { AuthenticatedRequest } from '../types/infrastructure';
import type { Request, Response } from 'express';

async function postOrder(req: Request, res: Response) {
	const body = req.body as Order;
  
	try {
		const order = await OrderData.createOrder(body);
		return res.status(201).send(order);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function getOrderById(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const order = await OrderData.getOrderById(id);
		return res.status(200).send(order);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexOrders(req: Request, res: Response) {
	try {
		const orders = await OrderData.indexOrders();
		return res.status(200).send(orders);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexOrdersByShop(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const orders = await OrderData.indexOrdersByShop(id);
		return res.status(200).send(orders);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function indexOrdersByUser(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const orders = await OrderData.indexOrdersByUser(id);
		return res.status(200).send(orders);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

async function patchOrder(req: Request, res: Response) {
	const authReq = req as AuthenticatedRequest;
	const { id } = authReq.params;

	if(!await verifyShopOwner(authReq.user._id, id)){
		return res.status(401).send('You are not allowed to update an order that you do not own.');
	}

	try {
		const order = await OrderData.updateOrder(id, req.body);
		return res.status(200).send(order);
	} catch (error) {
		return res.status(400).send((error as Error).message);
	}
}

export {
	postOrder,
	getOrderById,
	indexOrders,
	indexOrdersByShop,
	indexOrdersByUser,
	patchOrder
};