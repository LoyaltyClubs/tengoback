'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cuota, {
        foreignKey: 'credito_id'
      });
      this.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id'
      })
    }
  };
  Credito.init({
    descripcion: DataTypes.STRING,
    secuencia: DataTypes.STRING,
    fecha: DataTypes.DATEONLY,
    estado: DataTypes.STRING,
    monto_capital: DataTypes.STRING,
    nro_cuotas: DataTypes.INTEGER,
    monto_financiado: DataTypes.DECIMAL,
    fecha_primer_cuota: DataTypes.DATEONLY,
    deleted: DataTypes.BOOLEAN,
    monto_cuota: DataTypes.DECIMAL,
    mora: DataTypes.DECIMAL,
    cliente_id: DataTypes.INTEGER,
    cod_autorizacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Credito',
  });
  return Credito;
};