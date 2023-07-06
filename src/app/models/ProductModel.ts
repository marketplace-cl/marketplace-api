import mongoose, { ObjectId, Schema } from "mongoose";

interface IProductSchema {
  title: string;
  price: number;
  rate: number;
  totalOfReviews: number;
  image: string;
  images: Array<string>;
  quantity: number;
  specifications: Object;
  comments: Array<Comment>;
  category: Schema.Types.ObjectId;
}
interface Comment {
  userId: ObjectId;
  comment: string;
  rating: number;
}

const commentSchema = new mongoose.Schema<Comment>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  comment: { type: String, required: true },
  rating: { type: Number },
});

const productSchema = new mongoose.Schema<IProductSchema>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "CategorySchema",
    },
    rate: { type: Number },
    totalOfReviews: { type: Number },
    image: { type: String },
    images: [{ type: String }],
    quantity: { type: Number, required: true },
    specifications: { type: Object },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("ProductSchema", productSchema);
