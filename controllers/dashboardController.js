const index = (req, res) => {
  res.send("This is a page with authentication required. Your email is :" + req.user[0].email);
};

module.exports = {
  index
};
