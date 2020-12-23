const { sequelize } = require('../models/index');

const Product = require('../models/Product');
const Cart = require('../models/Cart');

const formatToCurrency = require('../../utils/formatToCurrency');
const parseCurrencyToNumber = require('../../utils/parseCurrencyToNumber');

const AdminController = {
  async libraryPage(req, res) {
    await Product.findAll()
      .then((products) => {
        return res.render('admin/library', {
          title: 'Livraria, todos os livros',
          header: 'Admin',
          products,
        });
      })
      .catch((err) => {
        return res.status(400).send({ error: err });
      });
  },

  async bookPage(req, res) {
    const productId = req.params.id;

    await Product.findOne({ where: { id: productId } })
      .then((product) => {
        return res.render('admin/book', {
          title: product ? product.name : 'Livro não encontrado',
          header: 'Admin-book',
          product,
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  addNewBookPage(req, res) {
    return res.render('admin/add-new-book', {
      title: 'Adicione um novo livro',
      header: 'Admin-book',
    });
  },

  async addNewBook(req, res) {
    const { name, author, style, price, image } = req.body;

    await Product.create({
      name,
      author,
      style,
      price: formatToCurrency(
        'pt-br',
        'BRL',
        parseCurrencyToNumber(price, 'float')
      ),
      image,
    })
      .then(() => res.redirect('/admin'))
      .catch(() => {
        res.status(400).redirect('/admin/add-new');
      });
  },

  async editBookPage(req, res) {
    const productId = req.params.id;

    await Product.findOne({ where: { id: productId } })
      .then((product) => {
        return res.render('admin/edit-book', {
          title: product ? product.name : 'Livro não encontrado',
          header: 'Admin-book',
          product,
        });
      })
      .catch(() => {
        return res.status(400).redirect('/admin');
      });
  },

  async editBook(req, res) {
    const { name, author, style, price, id, image } = req.body;

    await Product.update(
      {
        name,
        author,
        style,
        price: formatToCurrency(
          'pt-br',
          'BRL',
          parseCurrencyToNumber(price, 'float')
        ),
        image,
      },
      { where: { id } }
    )
      .then(() => res.redirect('/admin'))
      .catch(() => {
        res.status(400).redirect('/admin');
      });
  },

  // delete book functionality
  async deleteBook(req, res) {
    const { id } = req.body;

    const transaction = await sequelize.transaction();

    await Cart.destroy({ where: { product_id: id } }).catch(
      () => {
        res.status(400).redirect('/admin');
      },
      { transaction }
    );

    await Product.destroy({ where: { id } }, { transaction })
      .then(() => {
        transaction.commit();
        res.redirect('/admin');
      })
      .catch(() => {
        res.status(400).redirect('/admin');
      });
  },
};

module.exports = AdminController;
