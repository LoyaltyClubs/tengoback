'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_tarjeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tipo_tarjeta.init({
    nombre: DataTypes.STRING,
    stado: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tipo_tarjeta',
  });
  return Tipo_tarjeta;
};