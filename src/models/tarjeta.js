'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarjeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Tipo_tarjeta,{
         foreignKey:'tipo_id'
      })
      this.belongsTo(models.Cliente,{
        foreignKey: 'cliente_id'
      });
    }
  };
  Tarjeta.init({
    numero: DataTypes.STRING,
    fecha_vencimiento: DataTypes.STRING,
    estado: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    cliente_id: DataTypes.INTEGER,
    saldo: DataTypes.DOUBLE,
    tipo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarjeta',
  });
  return Tarjeta;
};