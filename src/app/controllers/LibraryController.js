// models
const Book = require('../models/Book');
const Cart = require('../models/Cart');
// utils
const formatToCurrency = require('../../utils/formatToCurrency');
const parseCurrencyToNumber = require('../../utils/parseCurrencyToNumber');

const LibraryController = {
  landingPage(req, res) {
    Book.findAll((products) => {
      return res.render('library/index', {
        title: 'Livraria Digital',
        header: 'Landing',
        books: products.filter((product) => product.id <= 4),
      });
    });
  },

  libraryPage(req, res) {
    Cart.getCartTotalPrice((totalPrice) => {
      Book.findAll((products) => {
        return res.render('library/library', {
          title: 'Todos os livros',
          header: 'Library',
          books: products,
          totalPrice,
        });
      });
    });
  },

  bookPage(req, res) {
    const bookId = req.params.id;

    Cart.getCartTotalPrice((totalPrice) => {
      Book.findById(bookId, (product) => {
        return res.render('library/book', {
          title: product ? product.name : 'Livro não encontrado',
          header: 'Library-Page',
          book: product,
          totalPrice,
        });
      });
    });
  },

  cartPage(req, res) {
    Cart.getCartProducts((cart) => {
      Book.findAll((products) => {
        const cartOrders = [];

        for (product of products) {
          const cartProductData = cart.products.find(
            (prod) => prod.id == product.id
          );

          if (cartProductData) {
            const price =
              parseCurrencyToNumber(product.price, 'float') *
              cartProductData.qty;

            cartOrders.push({
              product,
              qty: cartProductData.qty,
              price: formatToCurrency('pt-BR', 'BRL', price),
            });
          }
        }

        return res.render('library/cart', {
          title: 'Carrinho',
          header: 'Library-Page',
          orders: cartOrders,
          totalPrice: cart.totalPrice,
        });
      });
    });
  },

  addToCart(req, res) {
    const { book_id, book_price } = req.body;

    Cart.addProduct(book_id, book_price, () => {
      res.redirect('/library/cart');
    });
  },

  removeFromCart(req, res) {
    const { product_id, product_price } = req.body;

    Cart.deleteProduct(product_id, product_price, () => {
      res.redirect('/library/cart');
    });
  },

  checkoutPage(req, res) {
    Cart.getCartTotalPrice((totalPrice) => {
      return res.render('library/checkout', {
        title: 'Finalizar Compra',
        header: 'Library-Page',
        totalPrice,
      });
    });
  },

  checkoutEndPage(req, res) {
    Cart.getCartTotalPrice((totalPrice) => {
      return res.render('library/checkout-end', {
        title: 'Obrigado pela preferência!',
        header: '',
        totalPrice,
      });
    });
  },
};

module.exports = LibraryController;
