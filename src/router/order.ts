import * as OrderMiddleware from '../middleware/order';
import type { Route } from "../types/infrastructure";

const BASE_PATH = "/orders";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		protected: true,
		handler: [OrderMiddleware.postOrder]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [OrderMiddleware.indexOrders],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "get",
		handler: [OrderMiddleware.getOrderById],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "patch",
		protected: true,
		handler: [OrderMiddleware.patchOrder],
	}
];

export { routes };