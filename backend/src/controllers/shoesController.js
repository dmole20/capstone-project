import Shoes from "../models/Shoes";
import Retailer from "../models/Retailer";
import User from "../models/User";
import mongoose from "mongoose";

export const getShoes = async (req, res) => {
  const shoes = await Shoes.find({}).populate("retailer");
  return res.json(shoes);
};

// shoes의 이름, image, 가격, 240~310 각 사이즈 수량 받아서 db에 추가
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
      size: {
        m_240: { stocks: m_240 },
        m_245: { stocks: m_245 },
        m_250: { stocks: m_250 },
        m_255: { stocks: m_255 },
        m_260: { stocks: m_260 },
        m_265: { stocks: m_265 },
        m_270: { stocks: m_270 },
        m_275: { stocks: m_275 },
        m_280: { stocks: m_280 },
        m_285: { stocks: m_285 },
        m_290: { stocks: m_290 },
        m_295: { stocks: m_295 },
        m_300: { stocks: m_300 },
        m_305: { stocks: m_305 },
        m_310: { stocks: m_310 },
      },
    });
    const retailer = await Retailer.findById(_id);
    retailer.shoes.push(newShoes._id);
    await retailer.save();
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).json({ errorMessage: error._message });
  }
};

export const startDeadline = async (req, res) => {
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
  shoes.deadlineStatus = 1;
  await shoes.save();
  return res.sendStatus(200);
};

export const endDeadline = async (req, res) => {
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
  shoes.deadlineStatus = 2;
  await shoes.save();
  return res.sendStatus(200);
};

// 해당 id의 shoes 정보
export const getShoesDetail = async (req, res) => {
  const { id } = req.params;
  const shoes = await Shoes.findById(id).populate("retailer");
  if (!shoes) {
    return res.status(400).json({ errorMessage: "Not found." });
  }
  return res.json(shoes);
};

// 해당 id의 shoes를 db에서 삭제. 아직 연관된 다른 collection에서 삭제는 구현안됨.
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
  const retailer = await Retailer.findById(_id);

  await Shoes.findByIdAndDelete(id);
  const deletedId = mongoose.Types.ObjectId(id);
  const idx = retailer.shoes.indexOf(deletedId);
  retailer.shoes.splice(idx, 1);
  await retailer.save();

  return res.sendStatus(200);
};

// (user로 로그인됐을 시에만 가능) 해당 id의 shoes의 응모에 참여.
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
      shoes.size.m_240.applicants.push(user._id);
      break;
    case 245:
      shoes.size.m_245.applicants.push(user._id);
      break;
    case 250:
      shoes.size.m_250.applicants.push(user._id);
      break;
    case 255:
      shoes.size.m_255.applicants.push(user._id);
      break;
    case 260:
      shoes.size.m_260.applicants.push(user._id);
      break;
    case 265:
      shoes.size.m_265.applicants.push(user._id);
      break;
    case 270:
      shoes.size.m_270.applicants.push(user._id);
      break;
    case 275:
      shoes.size.m_275.applicants.push(user._id);
      break;
    case 280:
      shoes.size.m_280.applicants.push(user._id);
      break;
    case 285:
      shoes.size.m_285.applicants.push(user._id);
      break;
    case 290:
      shoes.size.m_290.applicants.push(user._id);
      break;
    case 295:
      shoes.size.m_295.applicants.push(user._id);
      break;
    case 300:
      shoes.size.m_300.applicants.push(user._id);
      break;
    case 305:
      shoes.size.m_305.applicants.push(user._id);
      break;
    case 310:
      shoes.size.m_310.applicants.push(user._id);
      break;
    default:
  }
  user.applyings.push(shoes._id);
  await shoes.save();
  await user.save();
  return res.sendStatus(200);
};

const drawForSize = size => {
  const { stocks, applicants, winner } = size;
  // console.log(stocks, applicants, winner);
  if (applicants.length <= stocks) {
    size.winner = applicants;
    return size;
  }

  let randomIndices = [];
  for (let i = 0; i < stocks; i++) {
    const randomIndex = Math.floor(Math.random() * applicants.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
      winner.push(applicants[randomIndex]);
    } else {
      i--;
    }
  }

  size.winner = winner;
  return size;
};

// (해당 shoes의 주인 retailer로 로그인했을 시에만) 해당 id의 shoe를 추첨하고 당첨자를 db에 저장 (미완성)
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
  shoes.size.m_240 = drawForSize(shoes.size.m_240);
  shoes.size.m_245 = drawForSize(shoes.size.m_245);
  shoes.size.m_250 = drawForSize(shoes.size.m_250);
  shoes.size.m_255 = drawForSize(shoes.size.m_255);
  shoes.size.m_260 = drawForSize(shoes.size.m_260);
  shoes.size.m_265 = drawForSize(shoes.size.m_265);
  shoes.size.m_270 = drawForSize(shoes.size.m_270);
  shoes.size.m_275 = drawForSize(shoes.size.m_275);
  shoes.size.m_280 = drawForSize(shoes.size.m_280);
  shoes.size.m_285 = drawForSize(shoes.size.m_285);
  shoes.size.m_290 = drawForSize(shoes.size.m_290);
  shoes.size.m_295 = drawForSize(shoes.size.m_295);
  shoes.size.m_300 = drawForSize(shoes.size.m_300);
  shoes.size.m_305 = drawForSize(shoes.size.m_305);
  shoes.size.m_310 = drawForSize(shoes.size.m_310);
  await shoes.save();
  res.sendStatus(200);
};
