const checkAuthenticated =  (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).json({ error: "You must be authentificated" });
  }
}

module.exports = {checkAuthenticated}