'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Provincia,{
        foreignKey: 'ciudad_id'
      });
      this.hasMany(models.Empresa, {
        foreignKey: 'ciudad_id'
      });
      this.hasMany(models.Cliente, {
        foreignKey: 'ciudad_id'
      });
    }
  };
  Ciudad.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Ciudad',
  });
  return Ciudad;
};