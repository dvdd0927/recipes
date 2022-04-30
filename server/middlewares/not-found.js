const notFoundRoute = async (req, res) => {
  res.status(404).json({ msg: "404 Page not Found" });
};

module.exports = notFoundRoute;
