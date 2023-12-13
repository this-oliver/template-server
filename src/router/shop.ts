import * as ShopMiddleware from '../middleware/shop';
import { indexOrdersByShop } from '../middleware/order';
import { indexProductsByShop } from '../middleware/product';
import type { Route } from "../types/infrastructure";

const BASE_PATH = "/shops";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		protected: true,
		handler: [ShopMiddleware.postShop]
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [ShopMiddleware.indexShops],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "get",
		handler: [ShopMiddleware.getShopById],
	},
	{
		path: `${BASE_PATH}/:id/products`,
		method: "get",
		handler: [indexProductsByShop],
	},
	{
		path: `${BASE_PATH}/:id/orders`,
		method: "get",
		handler: [indexOrdersByShop],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "patch",
		protected: true,
		handler: [ShopMiddleware.patchShop],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "delete",
		protected: true,
		handler: [ShopMiddleware.deleteShop],
	}
];

export { routes };