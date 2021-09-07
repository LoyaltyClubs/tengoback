'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Ciudad, {
        foreignKey: 'ciudad_id'
      });
    }
  };
  Provincia.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    ciudad_id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Provincia',
  });
  return Provincia;
};