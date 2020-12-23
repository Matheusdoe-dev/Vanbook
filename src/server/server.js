const app = require('../app');
// db
const { sequelize } = require('../app/models/index');

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const PORT = process.env.PORT || 3333;

sequelize.createSchema(process.env.DB_DATABASE);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Erro ao carregar o banco de dados.
    ${err}
  `);
  });
