import Mongoose from "mongoose";
import { Schema } from "mongoose";
import { indexOrdersByShop } from "./order";
import { indexProductsByShop } from "./product";
import type { Shop as IShop } from "../types/logic";

type ShopDocument = IShop & Mongoose.Document;

const ShopModel = Mongoose.model("shop", new Mongoose.Schema<ShopDocument>(
	{
		owner: { type: Schema.Types.ObjectId, ref: "user" },
		name: { type: String, required: true },
		description: { type: String, default: "" },
		products: [{ type: Schema.Types.ObjectId, ref: "product" }]
	},
	{ timestamps: true }
));

async function createShop(shop: IShop): Promise<ShopDocument> {
	return await ShopModel.create(new ShopModel(shop));
}

async function getShopById(id: string): Promise<ShopDocument | null> {
	return await ShopModel.findById(id).exec();
}

async function indexShops(): Promise<ShopDocument[]> {
	return await ShopModel.find().exec();
}

async function indexShopsByOwner(owner: string): Promise<ShopDocument[]> {
	return await ShopModel.find({ owner }).exec();
}

async function updateShop(id: string, patch: Partial<IShop>): Promise<ShopDocument | null> {
	const shop = await getShopById(id);

	if(!shop){
		throw new Error(`Shop with id ${id} not found`);
	}

	return await ShopModel.findByIdAndUpdate(id, patch, { new: true }).exec();
}

async function deleteShop(id: string): Promise<ShopDocument | null> {
	const shop = await getShopById(id);

	if(!shop){
		throw new Error(`Shop with id ${id} not found`);
	}

	const orders = await indexOrdersByShop(id);
	const incompleteOrders = orders.filter(order => order.status !== "completed" && order.status !== "cancelled");

	if(incompleteOrders.length > 0){
		throw new Error(`Shop with id ${id} cannot be deleted because it has incomplete orders`);
	}
  
	const products = await indexProductsByShop(id);

	if(products.length > 0){
		throw new Error(`Shop with id ${id} cannot be deleted because it has products`);
	}

	return await ShopModel.findByIdAndDelete(id).exec();
}

export {
	ShopDocument,
	ShopModel,
	createShop,
	getShopById,
	indexShops,
	indexShopsByOwner,
	updateShop,
	deleteShop
};