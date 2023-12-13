import Mongoose from "mongoose";
import { Schema } from "mongoose";
import type { Product as IProduct } from "../types/logic";

type ProductDocument = IProduct & Mongoose.Document;

const ProductModel = Mongoose.model("product", new Mongoose.Schema<ProductDocument>(
	{
		shop: { type: Schema.Types.ObjectId, ref: "shop" },
		name: { type: String, required: true },
		description: { type: String, default: "" },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		images: [{
			url: { type: String, required: true },
			alt: { type: String, required: true }
		}]
	},
	{ timestamps: true }
));

async function createProduct(product: IProduct): Promise<ProductDocument> {
	return await ProductModel.create(new ProductModel(product));
}

async function getProductById(id: string): Promise<ProductDocument | null> {
	return await ProductModel.findById(id).exec();
}

async function indexProducts(): Promise<ProductDocument[]> {
	return await ProductModel.find().exec();
}

async function indexProductsByShop(shopId: string): Promise<ProductDocument[]> {
	return await ProductModel.find({ shop: shopId }).exec();
}

async function updateProduct(id: string, patch: Partial<IProduct>): Promise<ProductDocument | null> {
	const product = await getProductById(id);

	if(!product){
		throw new Error(`Product with id ${id} not found`);
	}
  
	product.name = patch.name || product.name;
	product.description = patch.description || product.description;
	product.images = patch.images || product.images;
  
	// if the price is not defined in the patch, do not update it
	if(patch.price !== undefined){
		product.price = patch.price;
	}

	// if the quantity is not defined in the patch, do not update it
	if(patch.quantity !== undefined){
		product.quantity = patch.quantity;
	}

	return await product.save();
}

async function deleteProduct(id: string): Promise<ProductDocument | null> {
	const product = await getProductById(id);

	if(!product){
		throw new Error(`Product with id ${id} not found`);
	}

	return await ProductModel.findByIdAndDelete(id).exec();
}

export {
	ProductDocument,
	ProductModel,
	createProduct,
	getProductById,
	indexProducts,
	indexProductsByShop,
	updateProduct,
	deleteProduct
};