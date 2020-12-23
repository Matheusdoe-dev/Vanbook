const Sequelize = require('sequelize');
// database
const { sequelize } = require('./index');

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  style: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
