import Retailer from "../models/Retailer";
import bcrypt from "bcrypt";

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
    return res.redirect("/re-join");
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
  return res.redirect("/");
};

export const re_logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
