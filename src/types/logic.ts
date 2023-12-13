/**
 * Types and interfaces for application logic (i.e. users, posts, etc.)
 */

import type { ObjectId } from "mongoose";


export interface User {
  username: string;
  password: string;
}

export interface Image {
  url: string;
  alt: string;
}

export interface Product {
  shop: string | ObjectId; // shop id
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: Image[];
}

export interface Shop {
  owner: string | ObjectId; // user id
  name: string;
  description: string;
  products: string | Product[]; // ids or products
}

type OrderStatus = "pending" | "completed" | "cancelled";

export interface Order {
  status: OrderStatus;
  shop: string | ObjectId; // shop id
  customer: string | ObjectId; // user id
  items: { product: Product; quantity: number }[];
}
