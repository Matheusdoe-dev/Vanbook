const { sequelize } = require('../../src/app/models/index');

module.exports = () => {
  Promise.all(
    Object.keys(sequelize.models).map((key) => {
      return sequelize.models[key].destroy({
        truncate: { cascade: true },
        force: true,
      });
    })
  );
};
