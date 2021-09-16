'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pago.init({
    nro_transaccion: DataTypes.STRING,
    fecha_transaccion: DataTypes.DATE,
    nro_vendedor: DataTypes.INTEGER,
    forma_pago: DataTypes.INTEGER,
    monto_abonado: DataTypes.DECIMAL,
    nro_comprobante: DataTypes.STRING,
    cliente_id: DataTypes.INTEGER,
    ci_cliente: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pago',
  });
  return Pago;
};