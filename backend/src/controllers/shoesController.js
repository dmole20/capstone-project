import Shoes from "../models/Shoes";
import Retailer from "../models/Retailer";

export const getShoes = async (req, res) => {
  const shoes = await Shoes.find({}).populate("retailer");
  return res.json({ shoes });
};

export const uploadShoes = async (req, res) => {
  const {
    retailer: { _id },
  } = req.session;
  const { shoesName, imageUrl, price } = req.body;
  try {
    const newShoes = await Shoes.create({
      shoesName,
      imageUrl,
      price,
      retailer: _id,
    });
    const retailer = await Retailer.findById(_id);
    retailer.shoes.push(newShoes._id);
    retailer.save();
    return res.status(200);
  } catch (error) {
    return res.status(400).json({ errorMessage: error._message });
  }
};
