import mongoose from "mongoose";
import bcrypt from "bcrypt";

const retailerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  shop: { type: String, required: true },
  address: { type: String, required: true },
  shoes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shoes" }],
});

retailerSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const Retailer = mongoose.model("Retailer", retailerSchema);

export default Retailer;
