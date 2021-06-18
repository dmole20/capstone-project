export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.status(400).json({ errorMessage: "Log in first." });
    return res.redirect("/login");
  }
};

export const userOnlyMiddleware = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.status(400).json({ errorMessage: "Log in first." });
    return res.redirect("/login");
  }
};

export const retailerOnlyMiddleware = (req, res, next) => {
  if (req.session.retailer) {
    return next();
  } else {
    res.status(400).json({ errorMessage: "Log in first." });
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    res.status(400).json({ errorMessage: "Not authorized" });
    return res.redirect("/");
  }
};
