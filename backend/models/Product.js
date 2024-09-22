import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: Array, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    features: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
