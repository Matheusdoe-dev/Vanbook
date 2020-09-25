const LibraryController = {
  landingPage(req, res) {
    return res.render("index", {
      title: "Livraria Digital",
    });
  },

  libraryPage(req, res) {
    return res.render("library", {
      title: "Todos os livros",
    });
  },

  bookPage(req, res) {
    return res.render("book", {
      title: "Harry Potter e A Pedra Filosofal",
    });
  },

  cartPage(req, res) {
    return res.render("cart", {
      title: "Carrinho",
    });
  },

  checkoutPage(req, res) {
    return res.render("checkout", {
      title: "Finalizar Compra",
    });
  },
};

module.exports = LibraryController;
