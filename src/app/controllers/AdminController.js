// models
const Book = require('../models/Book');
const Cart = require('../models/Cart');

// admin controller
const AdminController = {
  // library page
  async libraryPage(req, res) {
    await Book.findAll()
      .then((books) => {
        return res.render('admin/library', {
          title: 'Livraria, todos os livros',
          header: 'Admin',
          prods: books,
        });
      })
      .catch((err) => {
        return res.status(400).send({ error: err });
      });
  },

  // single book page
  async bookPage(req, res) {
    const bookId = req.params.id;

    await Book.findById(bookId)
      .then((book) => {
        return res.render('admin/book', {
          title: book ? book.name : 'Livro não encontrado',
          header: 'Admin-book',
          book,
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // add new book page
  addNewBookPage(req, res) {
    return res.render('admin/add-new-book', {
      title: 'Adicione um novo livro',
      header: 'Admin-book',
    });
  },

  // add new book functionality
  async addNewBook(req, res) {
    const { name, author, style, price, image } = req.body;

    const book = new Book(name, author, style, price, image);

    await book
      .create()
      .then(() => {
        res.redirect('/admin');
      })
      .catch((err) => {
        console.log(err);
        res.status(400).redirect('/admin/add-new');
      });
  },

  // edit a book page
  async editBookPage(req, res) {
    const bookId = req.params.id;

    await Book.findById(bookId)
      .then((book) => {
        return res.render('admin/edit-book', {
          title: book ? book.name : 'Livro não encontrado',
          header: 'Admin-book',
          book,
        });
      })
      .catch((err) => {
        return res.status(400).send({ err });
      });
  },

  // edit book functionality
  async editBook(req, res) {
    const { name, author, style, price, id, image } = req.body;

    await Book.editById(id, {
      name,
      author,
      style,
      price,
      image,
    })
      .then(() => {
        res.redirect('/admin');
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  },

  // delete book functionality
  async deleteBook(req, res) {
    const { id } = req.body;

    await Cart.deleteProduct(id).catch((err) => res.status(400).send({ err }));

    await Book.deleteById(id)
      .then(() => {
        res.redirect('/admin');
      })
      .catch(() => {
        res.status(400).redirect('/admin');
      });
  },
};

module.exports = AdminController;
