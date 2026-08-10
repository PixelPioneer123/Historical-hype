import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id: { type: String }, // custom slug id, e.g. "deconstructed-duchess", instead of an auto ObjectId
    name: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    dropId: { type: String, default: null },
    price: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isNew: { type: Boolean, default: false },
    images: { type: [String], required: true },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    description: { type: String, default: "" },
    materials: { type: String, default: "" },
    shipping: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
