// database
const db = require('../../config/database');
// models
const Cart = require('./Cart');
// utils
const formatToCurrency = require('../../utils/formatToCurrency');

// Book model
class Book {
  constructor(name, author, style, price, image) {
    this.name = name;
    this.author = author;
    this.style = style;
    this.price = formatToCurrency('pt-br', 'BRL', Number.parseFloat(price));
    this.image_url = image;
  }

  // create new book
  create() {
    return db.execute(
      `INSERT INTO books (name, author, price, image_url, style) VALUES (?,?,?,?,?);`,
      [this.name, this.author, this.price, this.image_url, this.style]
    );
  }

  // edit a book
  static editById(id, data) {
    return db.execute(
      'UPDATE books SET name = ?, author = ?, price = ?, image_url = ?, style = ? WHERE books.book_id = ?',
      [data.name, data.author, data.price, data.image, data.style, id]
    );
  }

  // delete a book
  static async deleteById(id) {
    await Cart.deleteProduct(id);

    return db.execute('DELETE FROM books WHERE (books.book_id = ?)', [id]);
  }

  // find all books
  static async findAll() {
    return db.execute(`SELECT * FROM books`).then((r) => r[0]);
  }

  // find book by id
  static async findById(id) {
    return db
      .execute('SELECT * FROM books WHERE books.book_id = ?', [id])
      .then((r) => r[0][0]);
  }
}

module.exports = Book;
