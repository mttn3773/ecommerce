import { Document } from "mongoose";
export interface IProduct extends Document {
  title: string;
  price: number;
  descripion?: string;
  images: Image[];
  subcategory?: string;
  category: string;
  inStock: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}
interface Image {
  public_id: string;
  url: string;
}

export interface IProductJson {
  _id: string;
  title: string;
  price: number;
  descripion?: string;
  images: Image[];
  subcategory?: string;
  category: string;
  inStock: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProduct {
  title: string;
  price: number;
  description?: string;
  images: Image[];
  category: string;
  subcategory?: string;
}
