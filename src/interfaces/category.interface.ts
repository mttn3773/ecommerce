import { Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  subcategories: string[];
  created_at: string;
  updated_at: string;
}
