const ShopController = {
  landingPage(req, res) {
    return res.render("index", {
      title: "Livraria Digital",
    });
  },
};

module.exports = ShopController;
