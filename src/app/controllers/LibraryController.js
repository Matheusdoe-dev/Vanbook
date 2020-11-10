// models
const Book = require('../models/Book');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
// utils
const formatToCurrency = require('../../utils/formatToCurrency');
const parseCurrencyToNumber = require('../../utils/parseCurrencyToNumber');

const LibraryController = {
  // landing page / index
  async landingPage(req, res) {
    await Book.findAll()
      .then((books) => {
        return res.render('library/index', {
          title: 'Livraria Digital',
          header: 'Landing',
          books: books.filter((book) => book.book_id <= 4),
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // library/shop page
  async libraryPage(req, res) {
    const totalPrice = await Cart.getCartTotalPrice();

    // find all books to render on view
    await Book.findAll()
      .then((books) => {
        return res.render('library/library', {
          title: 'Todos os livros',
          header: 'Library-Page',
          books,
          totalPrice: totalPrice || 'R$ 0,00',
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // single book page
  async bookPage(req, res) {
    const bookId = req.params.id;

    const totalPrice = await Cart.getCartTotalPrice();

    await Book.findById(bookId)
      .then((book) => {
        return res.render('library/book', {
          title: book ? book.name : 'Livro não encontrado',
          header: 'Library-Page',
          book,
          totalPrice: totalPrice || 'R$ 0,00',
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // cart page
  async cartPage(req, res) {
    const cart = await Cart.getCartProducts().then((r) => r[0]);

    const totalPrice = await Cart.getCartTotalPrice();

    await Book.findAll()
      .then((books) => {
        const cartOrders = [];

        books.forEach((book) => {
          const cartProductData = cart.find(
            (prod) => prod.book_id === book.book_id
          );

          if (cartProductData) {
            const price =
              parseCurrencyToNumber(book.price, 'float') * cartProductData.qty;

            cartOrders.push({
              book,
              qty: cartProductData.qty,
              price: formatToCurrency('pt-BR', 'BRL', price),
            });
          }
        });

        return res.render('library/cart', {
          title: 'Carrinho',
          header: 'Library-Page',
          orders: cartOrders,
          totalPrice: totalPrice || 'R$ 0,00',
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // add to cart functionality
  async addToCart(req, res) {
    const { book_id, book_price } = req.body;

    await Cart.addProduct(Number(book_id), book_price)
      .then(() => {
        res.redirect('/library/cart');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // remove from cart functionality
  async removeFromCart(req, res) {
    const { book_id, book_price } = req.body;

    await Cart.deleteProduct(book_id, book_price)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        res.redirect('/library/cart');
      });
  },

  // checkout page
  async checkoutPage(req, res) {
    const totalPrice = await Cart.getCartTotalPrice();

    return res.render('library/checkout', {
      title: 'Finalizar Compra',
      header: 'Library-Page',
      totalPrice: totalPrice || 'R$ 0,00',
    });
  },

  // checkout functionality
  async checkout(req, res) {
    const {
      name,
      email,
      address,
      city,
      uf,
      card_number,
      card_valid,
      cvv,
    } = await req.body;

    const order = new Order(
      name,
      email,
      address,
      city,
      uf,
      card_number,
      card_valid,
      cvv
    );

    await order
      .create()
      .then(() => {
        res.redirect('/library/checkout/end');
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // checkout done page
  checkoutEndPage(req, res) {
    return res.render('library/checkout-end', {
      title: 'Obrigado pela preferência!',
      header: 'Landing',
    });
  },
};

module.exports = LibraryController;
