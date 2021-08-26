'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*this.belongsTo(models.ciudad,{
        as: 'ciudad',
        foreignKey: 'ciudad_id'
      });
      this.belongsTo(models.rubro,{
        as: 'rubro',
        foreignKey: 'rubro_id'
      });
      this.belongsTo(models.plan,{
        as: 'plan',
        foreignKey: 'plan_id'
      });*/
    }
  };
  Empresa.init({
    nombre: DataTypes.STRING,
    razon_social: DataTypes.STRING,
    rubro_id: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    ciudad_id: DataTypes.INTEGER,
    fecha_cierre: DataTypes.DATE,
    inicio_contrato: DataTypes.DATE,
    fin_contrato: DataTypes.DATE,
    representante_legal: DataTypes.STRING,
    email: DataTypes.STRING,
    cargo: DataTypes.STRING,
    ci: DataTypes.STRING,
    expedicion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    plan_id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};