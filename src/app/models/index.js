const Sequelize = require('sequelize');

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'mysql',
  storage: './tests/database.sqlite',
  define: {
    timestamps: false,
  },
};

exports.sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config
);
