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

export const deleteShoes = async (req, res) => {
  const { id } = req.params;
  const {
    retailer: { _id },
  } = req.session;
  const shoes = await Shoes.findById(id);
  if (!shoes) {
    return res.status(404).json({ errorMessage: "Not found." });
  }
  if (String(shoes.retailer) !== String(_id)) {
    return res.status(403).json({ errorMessage: "You are not a seller." });
  }
  await Shoes.findByIdAndDelete(id);
  return res.sendStatus(201);
};

export const applyEvent = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;

  const shoes = await Shoes.findById(id);
  if (!shoes) {
    return res.status(404).json({ errorMessage: "Not found." });
  }

  const user = await User.findById(_id);
  if (!user) {
    return res.status(404).json({ errorMessage: "Not found." });
  }

  if (shoes.applicants.includes(user._id)) {
    return res.status(400).json({ errorMessage: "Already applied." });
  }

  shoes.applicants.push(user._id);
  user.applyings.push(shoes._id);
  shoes.save();
  user.save();
  return res.sendStatus(201);
};

// export const drawWinner = async (req, res) => {
//   const {
//     session: { retailer },
//     params: { id },
//     body: {
//       s_230,
//       s_235,
//       s_240,
//       s_245,
//       s_250,
//       s_255,
//       s_260,
//       s_265,
//       s_270,
//       s_275,
//       s_280,
//       s_285
//     }
//   } = req;
//   const shoes = await Shoes.findById(id).populate("applicants");
//   if (!shoes) {
//     return res.status(404).json({ errorMessage: "Not found." });
//   }

//   // draw

// };
