'use strict';
const Product = require('../../app/models/Product');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Carts', {
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
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Carts');
  },
};
