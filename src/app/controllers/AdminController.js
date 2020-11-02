// models
const Book = require('../models/Book');

const AdminController = {
  libraryPage(req, res) {
    Book.findAll((products) => {
      return res.render('admin/library', {
        title: 'Livraria, todos os livros',
        header: 'Admin',
        prods: products,
      });
    });
  },

  bookPage(req, res) {
    const bookId = req.params.id;

    Book.findById(bookId, (product) => {
      return res.render('admin/book', {
        title: product ? product.name : 'Livro não encontrado',
        header: 'Admin-book',
        book: product,
      });
    });
  },

  addNewBookPage(req, res) {
    return res.render('admin/add-new-book', {
      title: 'Adicione um novo livro',
      header: 'Admin-book',
    });
  },

  addNewBook(req, res) {
    const { name, author, style, price, image } = req.body;

    try {
      const book = new Book(name, author, style, price, image);

      book.create();

      res.redirect('/admin');
    } catch (err) {
      console.log(err);
      res.status(400).redirect('/admin/add-new');
    }
  },

  editBookPage(req, res) {
    const bookId = req.params.id;

    Book.findById(bookId, (product) => {
      res.render('admin/edit-book', {
        title: product ? product.name : 'Livro não encontrado',
        header: 'Admin-book',
        book: product,
      });
    });
  },

  editBook(req, res) {
    const { name, author, style, price, id } = req.body;

    Book.editById(
      id,
      {
        name,
        author,
        style,
        price,
      },
      () => {
        res.redirect('/admin');
      }
    );
  },

  deleteBook(req, res) {
    const { id } = req.body;

    Book.deleteById(id);
    res.redirect('/admin');
  },
};

module.exports = AdminController;
