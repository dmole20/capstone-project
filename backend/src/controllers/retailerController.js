import Retailer from "../models/Retailer";
import bcrypt from "bcrypt";

export const getRetailers = async (req, res) => {
  const retailers = await Retailer.find({}).populate("shoes");
  return res.json(retailers);
};

export const re_postJoin = async (req, res) => {
  const { username, password, passwrodConfirm, phone, shop, address } =
    req.body;

  if (password !== passwrodConfirm) {
    return res
      .status(400)
      .json({ errorMessage: "Password confirmation does not match." });
  }
  const exists = await Retailer.exists({ $or: [{ username }, { shop }] });
  if (exists) {
    return res
      .status(400)
      .json({ errorMessage: "This username/Shop is already taken." });
  }

  try {
    await Retailer.create({
      username,
      password,
      phone,
      shop,
      address,
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).json({ errorMessage: error._message });
  }
};

export const re_postLogin = async (req, res) => {
  const { username, password } = req.body;
  const retailer = await Retailer.findOne({ username });
  if (!retailer) {
    return res
      .status(400)
      .json({ errorMessage: "An account with this username does not exists." });
  }
  const pwVerif = await bcrypt.compare(password, retailer.password);
  if (!pwVerif) {
    return res.status(400).json({ errorMessage: "Wrong password." });
  }
  req.session.loggedIn = true;
  req.session.retailer = retailer;
  return res.sendStatus(201);
};

export const re_logout = (req, res) => {
  req.session.destroy();
  return res.sendStatus("200");
};

export const getRetailerProfile = async (req, res) => {
  const {
    retailer: { _id },
  } = req.session;
  const retailer = await Retailer.findById(_id).populate("shoes");
  if (!retailer) {
    res.status(404).json({ errorMessage: "Not found." });
  }
  return res.json(retailer);
};

export const getRetailerDetail = async (req, res) => {
  const { id } = req.params;
  const retailer = await Retailer.findById(id).populate("shoes");
  if (!retailer) {
    res.status(404).json({ errorMessage: "Not found." });
  }
  return res.json(retailer);
};
