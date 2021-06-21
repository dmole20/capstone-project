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
  const {
    shoesName,
    imageUrl,
    price,
    m_240,
    m_245,
    m_250,
    m_255,
    m_260,
    m_265,
    m_270,
    m_275,
    m_280,
    m_285,
    m_290,
    m_295,
    m_300,
    m_305,
    m_310,
  } = req.body;
  try {
    const newShoes = await Shoes.create({
      shoesName,
      imageUrl,
      price,
      retailer: _id,
      sizeStocks: {
        m_240,
        m_245,
        m_250,
        m_255,
        m_260,
        m_265,
        m_270,
        m_275,
        m_280,
        m_285,
        m_290,
        m_295,
        m_300,
        m_305,
        m_310,
      },
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
  return res.sendStatus(200);
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

  if (user.applyings.includes(shoes._id)) {
    return res.status(400).json({ errorMessage: "Already applied." });
  }
  switch (user.size) {
    case 240:
      shoes.applicants.m_240.push(user._id);
    case 245:
      shoes.applicants.m_245.push(user._id);
    case 250:
      shoes.applicants.m_250.push(user._id);
    case 255:
      shoes.applicants.m_255.push(user._id);
    case 260:
      shoes.applicants.m_260.push(user._id);
    case 265:
      shoes.applicants.m_265.push(user._id);
    case 270:
      shoes.applicants.m_270.push(user._id);
    case 275:
      shoes.applicants.m_275.push(user._id);
    case 280:
      shoes.applicants.m_280.push(user._id);
    case 285:
      shoes.applicants.m_285.push(user._id);
    case 290:
      shoes.applicants.m_290.push(user._id);
    case 295:
      shoes.applicants.m_295.push(user._id);
    case 300:
      shoes.applicants.m_300.push(user._id);
    case 305:
      shoes.applicants.m_305.push(user._id);
    case 310:
      shoes.applicants.m_310.push(user._id);
    default:
  }
  user.applyings.push(shoes._id);
  shoes.save();
  user.save();
  return res.sendStatus(200);
};

const drawForSize = (applicantsNum, winnerNum) => {
  let randomIndices = [];
  for (let i = 0; i < winnerNum; i++) {
    const randomIndex = Math.floor(Math.random() * applicantsNum.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(random);
    } else {
      i--;
    }
  }
  return randomIndices;
};

export const drawWinner = async (req, res) => {
  const {
    session: {
      retailer: { _id },
    },
    params: { id },
  } = req;
  const shoes = await Shoes.findById(id);
  if (!shoes) {
    return res.status(404).json({ errorMessage: "Not found." });
  }

  if (String(shoes.retailer) !== String(_id)) {
    return res.status(403).json({ errorMessage: "You are not a seller." });
  }

  // draw
  const winner_240 = drawForSize(
    shoes.applicants.m_240.length,
    shoes.sizeStocks.m_240
  );
  for (let i = 0; i < winner_240.length; i++) {
    const winner = shoes.applicants.m_240[winner_240[i]];
    shoes.winner.m_240.push(winner);
  }

  const winner_285 = drawForSize(
    shoes.applicants.m_285.length,
    shoes.sizeStocks.m_285
  );
  for (let i = 0; i < winner_285.length; i++) {
    const winner = shoes.applicants.m_285[winner_285[i]];
    shoes.winner.m_285.push(winner);
  }
  shoes.save();
};
