import mongoose from "mongoose";

const shoesSchema = new mongoose.Schema({
  shoesName: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Retailer",
  },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Shoes = mongoose.model("Shoes", shoesSchema);

export default Shoes;
