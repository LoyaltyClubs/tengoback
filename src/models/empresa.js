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
      this.belongsTo(models.Ciudad,{
        foreignKey: 'ciudad_id'
      });
      this.belongsTo(models.Rubro,{
        foreignKey: 'rubro_id'
      });
      this.belongsTo(models.Plan,{
        foreignKey: 'plan_id'
      });
      this.hasMany(models.Cliente, {
        foreignKey: 'empresa_id'
      });
    }
  };
  Empresa.init({
    nombre: DataTypes.STRING,
    razon_social: DataTypes.STRING,
    nit: DataTypes.STRING,
    rubro_id: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    ciudad_id: DataTypes.INTEGER,
    fecha_cierre: DataTypes.INTEGER,
    inicio_contrato: DataTypes.DATEONLY,
    fin_contrato: DataTypes.DATEONLY,
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