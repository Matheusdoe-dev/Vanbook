// database
const db = require('../../config/database');
// utils
const formatToCurrency = require('../../utils/formatToCurrency');
const parseCurrencyToNumber = require('../../utils/parseCurrencyToNumber');

// Cart model
class Cart {
  // add product
  static async addProduct(id, productPrice) {
    const existingProduct = await db
      .execute('SELECT * FROM cart WHERE cart.book_id = ?', [id])
      .then((r) => r[0][0]);

    if (existingProduct) {
      const updatedQty = existingProduct.qty + 1;
      const updatedPrice = formatToCurrency(
        'pt-br',
        'BRL',
        parseCurrencyToNumber(productPrice, 'float') * updatedQty
      );

      return db.execute(
        'UPDATE cart SET qty = ?, price = ? WHERE (book_id = ?)',
        [updatedQty, updatedPrice, id]
      );
    } else {
      return db.execute(
        'INSERT INTO cart (book_id, qty, price) VALUES (?, 1, ?)',
        [id, productPrice]
      );
    }
  }

  // delete a product qtd from cart
  static async deleteProduct(id) {
    return db.execute('DELETE FROM cart WHERE (book_id = ?)', [id]);
  }

  // get cart products
  static getCartProducts() {
    return db.execute('SELECT * FROM cart');
  }

  // get cart totalPrice
  static async getCartTotalPrice() {
    const cartProducts = await db
      .execute('SELECT * FROM cart')
      .then((r) => r[0])
      .catch((err) => {
        console.log(err);
      });

    let totalPrice = 0.0;

    cartProducts.forEach((product) => {
      totalPrice += parseCurrencyToNumber(product.price, 'float');
    });

    return formatToCurrency('pt-br', 'BRL', totalPrice);
  }
}

module.exports = Cart;
