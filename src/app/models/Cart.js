const Sequelize = require('sequelize');
// database
const { sequelize } = require('./index');
// models
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
  product_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
      deferrable: new Sequelize.Deferrable.INITIALLY_DEFERRED(),
    },
  },

  product_qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  product_cost: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Cart;
