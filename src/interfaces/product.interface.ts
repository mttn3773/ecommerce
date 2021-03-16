import { Document } from "mongoose";
export interface IProduct extends Document {
  title: string;
  price: number;
  descripion?: string;
  images: [];
  category: string;
  inStock: number;
  sold: number;
  created_at: string;
  updated_at: string;
}

export interface ICreateProduct {
  title: string;
  price: number;
  description?: string;
  images: [];
  category: string;
}
