const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const formatToCurrency = require('../../utils/formatToCurrency');
const parseCurrencyToNumber = require('../../utils/parseCurrencyToNumber');
const getCartTotalPrice = require('../../utils/getCartTotalPrice');

const LibraryController = {
  // landing page / index
  async landingPage(req, res) {
    await Product.findAll()
      .then((products) => {
        return res.render('library/index', {
          title: 'Livraria Digital',
          header: 'Landing',
          products: products.filter((product) => product.id <= 4),
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // library/shop page
  async libraryPage(req, res) {
    const totalPrice = await getCartTotalPrice();

    await Product.findAll()
      .then((products) => {
        return res.render('library/library', {
          title: 'Todos os livros',
          header: 'Library-Page',
          products,
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

    const totalPrice = await getCartTotalPrice();

    await Product.findOne({ where: { id: bookId } })
      .then((product) => {
        return res.render('library/book', {
          title: product ? product.name : 'Livro não encontrado',
          header: 'Library-Page',
          product,
          totalPrice: totalPrice || 'R$ 0,00',
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // cart page
  async cartPage(req, res) {
    const cart = await Cart.findAll();

    const totalPrice = await getCartTotalPrice();

    await Product.findAll()
      .then((products) => {
        const cartOrders = [];

        products.forEach((product) => {
          const cartProductData = cart.find(
            (prod) => prod.product_id === product.id
          );

          if (cartProductData) {
            const price =
              parseCurrencyToNumber(product.price, 'float') *
              cartProductData.product_qty;

            cartOrders.push({
              product,
              qty: cartProductData.product_qty,
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
    const { product_id, product_price } = req.body;

    const existingProduct = await Cart.findOne({ where: { product_id } });

    if (existingProduct) {
      await Cart.update(
        {
          product_qty: existingProduct.getDataValue('product_qty') + 1,
        },
        { where: { product_id } }
      )
        .then(() => {
          res.redirect('/library/cart');
        })
        .catch(() => {
          res.status(400).json({ err });
        });
    } else {
      await Cart.create({
        product_id,
        product_cost: product_price,
        product_qty: +1,
      })
        .then(() => {
          res.redirect('/library/cart');
        })
        .catch((err) => {
          res.status(400).json({ err });
        });
    }
  },

  // remove from cart functionality
  async removeFromCart(req, res) {
    const { product_id } = req.body;

    const existingProduct = await Cart.findOne({ where: { product_id } });

    if (existingProduct.product_qty > 1) {
      await Cart.update(
        {
          product_qty: existingProduct.getDataValue('product_qty') - 1,
        },
        { where: { product_id } }
      )
        .catch((err) => {
          res.status(400).json({ err });
        })
        .finally(() => {
          res.redirect('/library/cart');
        });
    } else {
      await Cart.destroy({ where: { product_id } })
        .catch((err) => {
          res.status(400).json({ err });
        })
        .finally(() => {
          res.redirect('/library/cart');
        });
    }
  },

  // checkout page
  async checkoutPage(req, res) {
    const totalPrice = await getCartTotalPrice();

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

    await Order.create({
      name,
      email,
      address,
      city,
      uf,
      card_number,
      card_valid,
      cvv,
    })
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
