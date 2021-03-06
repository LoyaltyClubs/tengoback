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
      this.belongsTo(models.Credito, {
        foreignKey: 'credito_id'
      });
    }
  };
  Cuota.init({
    descripcion: DataTypes.STRING,
    nro_de_cuota: DataTypes.INTEGER,
    capital: DataTypes.DECIMAL,
    interes: DataTypes.DECIMAL,
    honorario:DataTypes.DECIMAL,
    cobros: DataTypes.DECIMAL,
    pendiente: DataTypes.DECIMAL,
    abonado: DataTypes.DECIMAL,
    monto: DataTypes.DECIMAL,
    fecha_limite: DataTypes.DATEONLY,
    estado: DataTypes.STRING,
    credito_id: DataTypes.INTEGER,
    ci_cliente: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cuota',
  });
  return Cuota;
};