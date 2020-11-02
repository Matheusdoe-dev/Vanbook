const path = require('path');
const fs = require('fs');
// utils
const formatToCurrency = require('../../utils/formatToCurrency');
const parseCurrencyToNumber = require('../../utils/parseCurrencyToNumber');

const p = path.join(__dirname, '..', '..', '..', 'tmp', 'cart.json');

// utils
const getCartFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    let cart;

    if (!err) {
      cart = JSON.parse(fileContent);
    } else {
      cart = { products: [], totalPrice: 0 };
    }

    if (callback) {
      callback(cart);
    }
  });
};

// Cart model
class Cart {
  // add product
  static addProduct(id, productPrice, callback) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id == id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      const serializedPrice =
        parseCurrencyToNumber(cart.totalPrice, 'float') +
        parseCurrencyToNumber(productPrice, 'float');

      cart.totalPrice = formatToCurrency('pt-BR', 'BRL', serializedPrice);

      // saving the cart on file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
          return;
        }

        if (callback) {
          callback();
        }
      });
    });
  }

  // delete a product qtd from cart
  static deleteProduct(id, productPrice, callback) {
    getCartFromFile((cart) => {
      if (!cart) {
        return;
      }

      // updated cart
      const updatedCart = { ...cart };

      // getting product and product price
      const product = updatedCart.products.find((prod) => prod.id === id);

      if (!product) {
        return;
      }

      const productQty = product.qty;

      // updating cart
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );

      updatedCart.totalPrice = formatToCurrency(
        'PT-BR',
        'BRL',
        parseCurrencyToNumber(cart.totalPrice, 'float') -
          parseCurrencyToNumber(productPrice, 'float') * productQty
      );

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.log('error');
          return;
        }

        if (callback) {
          callback();
        }
      });
    });
  }

  // get cart products
  static getCartProducts(callback) {
    getCartFromFile(callback);
  }

  // get cart totalPrice
  static getCartTotalPrice(callback) {
    getCartFromFile((cart) => {
      const totalPrice = cart.totalPrice;

      callback(totalPrice);
    });
  }
}

module.exports = Cart;
