import { model, Model, models, Schema } from "mongoose";
import { ICategory } from "./../interfaces/category.interface";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Dataset;
