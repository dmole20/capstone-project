import User from "../models/User";
import bcrypt from "bcrypt";

export const postJoin = async (req, res) => {
  const {
    name,
    username,
    password,
    passwrodConfirm,
    phone,
    nikeId,
    birthday,
    size,
  } = req.body;

  if (password !== passwrodConfirm) {
    return res
      .status(400)
      .json({ errorMessage: "Password confirmation does not match." });
  }
  const exists = await User.exists({ $or: [{ username }, { nikeId }] });
  if (exists) {
    return res
      .status(400)
      .json({ errorMessage: "This username/Nike account is already taken." });
  }

  try {
    await User.create({
      name,
      username,
      password,
      phone,
      nikeId,
      birthday,
      size,
    });
    return res.redirect("/join");
  } catch (error) {
    return res.status(400).json({ errorMessage: error._message });
  }
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ errorMessage: "An account with this username does not exists." });
  }
  const pwVerif = await bcrypt.compare(password, user.password);
  if (!pwVerif) {
    return res.status(400).json({ errorMessage: "Wrong password." });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
