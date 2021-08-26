'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Plan.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    seguro: DataTypes.DECIMAL,
    mantenimiento: DataTypes.DECIMAL,
    recargo: DataTypes.DECIMAL,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};