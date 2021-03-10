const faker = require('faker');
const { factory } = require('factory-girl');

const Cart = require('../../src/app/models/Cart');
const Order = require('../../src/app/models/Order');
const Product = require('../../src/app/models/Product');

factory.define('Product', Product, {
  name: faker.name.title(),
  author: faker.name.findName(),
  style: 'Ficção',
  price: '49,00',
  image: faker.image.imageUrl(),
});

module.exports = factory;
