// database
const db = require('../../config/database');
// models
const Cart = require('./Cart');

class Order {
  constructor(name, email, address, city, uf, card_number, card_valid, cvv) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.city = city;
    this.uf = uf;
    this.card_number = card_number;
    this.card_valid = card_valid;
    this.cvv = cvv;
  }

  async create() {
    try {
      const totalPrice = await Cart.getCartTotalPrice();
      const cartBooks = await Cart.getCartProducts();

      await db.execute(
        'INSERT INTO orders (name, email, address, city, uf, card_number, card_valid, cvv, subtotal) VALUES (?,?,?,?,?,?,?,?,?)',
        [
          this.name,
          this.email,
          this.address,
          this.city,
          this.uf,
          this.card_number,
          this.card_valid,
          this.cvv,
          totalPrice,
        ]
      );

      const order_id = await db
        .execute('SELECT order_id FROM orders WHERE subtotal = ?', [totalPrice])
        .then((r) => r[0][0].order_id);

      cartBooks.forEach(async (book) => {
        if (book[0].book_id) {
          await db.execute(
            'INSERT INTO orders_items (order_id, book_id) VALUES (?, ?)',
            [order_id, book[0].book_id]
          );
        }
      });
    } catch (err) {
      return err;
    }
  }
}

module.exports = Order;
