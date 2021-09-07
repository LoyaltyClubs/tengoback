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
      this.hasMany(models.Credito, {
        foreignKey: 'cliente_id'
      });
      this.belongsTo(models.Ciudad, {
        foreignKey: 'ciudad_id'
      });
      this.hasMany(models.Tarjeta, {
        foreignKey: 'cliente_id'
      });
      this.belongsTo(models.Empresa, {
        foreignKey: 'empresa_id'
      });
    }
  };
  Cliente.init({
    nombre: DataTypes.STRING,
    apellido_paterno: DataTypes.STRING,
    apellido_materno: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    sexo: DataTypes.STRING,
    ci: DataTypes.INTEGER,
    calle_particular: DataTypes.STRING,
    zona: DataTypes.STRING,
    provincia: DataTypes.STRING,
    barrio: DataTypes.STRING,
    ciudad_id: DataTypes.INTEGER,
    telefono_fijo: DataTypes.INTEGER,
    telefono_celular: DataTypes.INTEGER,
    email: DataTypes.STRING,
    nombre_referencia: DataTypes.STRING,
    provincia_referencia: DataTypes.STRING,
    telefono_referencia: DataTypes.STRING,
    tipo_tel_referencia: DataTypes.STRING,
    parentesco_referencia: DataTypes.STRING,
    ciudad_referencia: DataTypes.STRING,
    dia_pago: DataTypes.INTEGER,
    linea_credito: DataTypes.DECIMAL,
    estado: DataTypes.STRING,
    empresa_id: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};