import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  subcategories: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryJSON {
  _id: string;
  name: string;
  subcategories: string[];
  createdAt: string;
  updatedAt: string;
}
