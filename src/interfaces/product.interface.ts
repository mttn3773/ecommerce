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
  created_at: string;
  updated_at: string;
}
interface Image {
  public_id: string;
  url: string;
}

export interface IProductJson {
  title: string;
  price: number;
  descripion?: string;
  images: Image[];
  subcategory?: string;
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
  images: Image[];
  category: string;
  subcategory?: string;
}
