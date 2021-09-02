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
      // this.hasMany(models.Tarjeta,{
      //   foreignKey:'id'
      // })
    }
  };
  Tipo_tarjeta.init({
    nombre: DataTypes.STRING,
    monto: DataTypes.DOUBLE,
    stado: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Tipo_tarjeta',
  });
  return Tipo_tarjeta;
};