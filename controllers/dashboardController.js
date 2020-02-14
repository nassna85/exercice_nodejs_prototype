const index = (req, res) => {
  res.send(
    "This is a page with authentication required. Votre adresse email est : " +
      req.user[0].email
  );
};

module.exports = {
  index
};
