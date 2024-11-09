import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageTablet: {
      type: String,
      required: true,
    },
    imageMobile: {
      type: String,
      required: true,
    },
    galleryImage: [{ type: String, required: true }],
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    inTheBox: {
      type: [
        {
          quantity: { type: Number, required: true },
          item: { type: String, required: true },
        },
      ],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
