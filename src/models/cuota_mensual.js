'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CuotaMensual extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CuotaMensual.init({
    name: DataTypes.STRING,
    monto_total: DataTypes.DECIMAL,
    interes: DataTypes.DECIMAL,
    estado: DataTypes.STRING,
    mora: DataTypes.DECIMAL,
    fecha: DataTypes.DATEONLY,
    gastos_cobranza: DataTypes.DECIMAL,
    cliente_id: DataTypes.INTEGER,
    ci_cliente: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Cuota_Mensual',
  });
  return CuotaMensual;
};