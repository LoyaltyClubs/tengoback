'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cuota.init({
    descripcion: DataTypes.STRING,
    nro_de_cuota: DataTypes.INTEGER,
    monto: DataTypes.DECIMAL,
    fecha_limite: DataTypes.DATE,
    estado: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cuota',
  });
  return Cuota;
};