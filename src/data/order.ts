import Mongoose from "mongoose";
import { Schema } from "mongoose";
import { ProductDocument, ProductModel, getProductById } from "./product";
import type { Order as IOrder } from "../types/logic";

type OrderDocument = IOrder & Mongoose.Document;

const OrderModel = Mongoose.model("order", new Mongoose.Schema<OrderDocument>(
	{
		shop: { type: Schema.Types.ObjectId, ref: "shop" },
		customer: { type: Schema.Types.ObjectId, ref: "user" },
		items: [{
			quantity: { type: Number, required: true },
			product: { type: ProductModel.schema, required: true }
		}]
	},
	{ timestamps: true }
));

async function createOrder(order: IOrder): Promise<OrderDocument> {
	
	// check if the ordered items are in stock
	for(const item of order.items){
		const id: string = (item.product as ProductDocument).id;
    
		// use the product in the database to check if it exists and has enough stock
		// instead of the product in the order (which may be outdated, non-existent or manipulated)
		const product = await getProductById(id);

		if(!product){
			throw new Error(`Product with id ${id} not found`);
		}

		if(product.quantity < item.quantity){
			throw new Error(`Product with id ${id} does not have enough stock`);
		}
	}
  
	return await OrderModel.create(new OrderModel(order));
}

async function getOrderById(id: string): Promise<OrderDocument | null> {
	return await OrderModel.findById(id).exec();
}

async function indexOrders(): Promise<OrderDocument[]> {
	return await OrderModel.find()
		.populate('shop')
		.populate('customer')
		.exec();
}

async function indexOrdersByShop(shopId: string): Promise<OrderDocument[]> {
	return await OrderModel.find({ shop: shopId })
		.populate('shop')
		.populate('customer')
		.exec();
}

async function indexOrdersByUser(userId: string): Promise<OrderDocument[]> {
	return await OrderModel.find({ customer: userId })
		.populate('shop')
		.populate('customer')
		.exec();
}

async function updateOrder(id: string, patch: Partial<IOrder>): Promise<OrderDocument | null> {
	const order = await getOrderById(id);

	if(!order){
		throw new Error(`Order with id ${id} not found`);
	}

	order.status = patch.status || order.status;

	return await order.save();
}

async function deleteOrder(id: string): Promise<OrderDocument | null> {
	throw new Error(`Orders cannot be deleted. Ref: ${id}`);
}

export {
	OrderDocument,
	OrderModel,
	createOrder,
	getOrderById,
	indexOrders,
	indexOrdersByShop,
	indexOrdersByUser,
	updateOrder,
	deleteOrder
};