'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    nombre: DataTypes.STRING,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    fecha_nacimineto: DataTypes.DATE,
    sexo: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};