import Shoes from "../models/Shoes";
import Retailer from "../models/Retailer";
import User from "../models/User";

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
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).json({ errorMessage: error._message });
  }
};

export const getShoesDetail = async (req, res) => {
  const { id } = req.params;
  const shoes = await Shoes.findById(id).populate("retailer");
  if (!shoes) {
    return res.status(400).json({ errorMessage: "Not found." });
  }
  return res.json({ shoes });
};

export const applyEvent = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;
  const shoes = await Shoes.findById(id);
  if (!shoes) {
    return res.status(404).json({ errorMessage: "Not found." });
  }

  shoes.applicants.push(user._id);
  user.applyings.push(shoes._id);
  shoes.save();
  user.save();
  return res.sendStatus(201);
};
