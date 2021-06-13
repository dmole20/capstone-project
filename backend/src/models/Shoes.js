import mongoose from "mongoose";

const shoesSchema = new mongoose.Schema({
  shoesName: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
});

const Shoes = mongoose.model("Shoes", shoesSchema);

export default Shoes;
