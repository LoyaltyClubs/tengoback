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
      this.hasMany(models.Cuota, {
        foreignKey: 'cuota_mensual_id'
      });
    }
  };
  CuotaMensual.init({
    nombre: DataTypes.STRING,
    monto_total: DataTypes.DECIMAL,
    interes: DataTypes.DECIMAL,
    estado: DataTypes.STRING,
    mora: DataTypes.DECIMAL,
    fecha: DataTypes.DATEONLY,
    gastos_cobranza: DataTypes.DECIMAL,
    cliente_id: DataTypes.INTEGER,
    ci_cliente: DataTypes.STRING,
    monto_capital: DataTypes.DECIMAL
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Cuota_Mensual',
  });
  return CuotaMensual;
};