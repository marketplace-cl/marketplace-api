import mongoose, { Schema, Document } from "mongoose";

export interface CategoryModel extends Document {
  name: string;
  icon: string;
}

const CategorySchema: Schema = new Schema<CategoryModel>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

export const CategoryModel = mongoose.model<CategoryModel>(
  "CategorySchema",
  CategorySchema
);
