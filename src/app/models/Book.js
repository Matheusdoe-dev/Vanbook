const path = require('path');
const fs = require('fs');
// models
const Cart = require('./Cart');
// utils
const formatToCurrency = require('../../utils/formatToCurrency');

const p = path.join(__dirname, '..', '..', '..', 'tmp', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// Book model
class Book {
  constructor(name, author, style, price, image) {
    this.name = name;
    this.author = author;
    this.style = style;
    this.price = formatToCurrency('pt-br', 'BRL', Number.parseFloat(price));
    this.image = image;
  }

  create() {
    getProductsFromFile((products) => {
      this.id = products.length + 1;
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static editById(id, data, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id == id);
      product.name = data.name;
      product.author = data.author;
      product.price = formatToCurrency(
        'pt-BR',
        'BRL',
        Number.parseFloat(data.price)
      );
      product.style = data.style;
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
      cb();
    });
  }

  static deleteById(id, cb) {
    getProductsFromFile((products) => {
      const selectedProduct = products.find((product) => product.id == id);
      const newProducts = products.filter(
        (product) => product.id !== selectedProduct.id
      );
      fs.writeFile(p, JSON.stringify(newProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, selectedProduct.price);
        }
      });

      // check if exists a callback to follow
      if (cb) {
        cb();
      }
    });
  }

  static findAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id == id);

      cb(product);
    });
  }
}

module.exports = Book;
