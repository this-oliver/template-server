import * as ProductMiddleware from '../middleware/product';
import type { Route } from "../types/infrastructure";

const BASE_PATH = "/products";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		protected: true,
		handler: [ProductMiddleware.postProduct]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [ProductMiddleware.indexProducts],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "get",
		handler: [ProductMiddleware.getProductById],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "patch",
		protected: true,
		handler: [ProductMiddleware.patchProduct],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "delete",
		protected: true,
		handler: [ProductMiddleware.deleteProduct],
	}
];

export { routes };