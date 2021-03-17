import { IProduct } from "./../interfaces/product.interface";
import { Schema, model, models, Model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String },
    images: { type: Array, required: true },
    inStock: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, trim: true },
  },
  { timestamps: true }
);

let Dataset: Model<IProduct> =
  models.Product || model<IProduct>("Product", ProductSchema);

export default Dataset;
