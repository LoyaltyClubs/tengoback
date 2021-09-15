'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cuota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      nro_de_cuota: {
        type: Sequelize.INTEGER
      },
      capital: {
        type: Sequelize.DECIMAL(10,2)
      },
      interes: {
        type: Sequelize.DECIMAL(10,2)
      },
      honorario:{
        type: Sequelize.DECIMAL(10,2)
      },
      cobros: {
        type: Sequelize.DECIMAL(10,2)
      },
      pendiente: {
        type: Sequelize.DECIMAL(10,2)
      },
      abonado: {
        type: Sequelize.DECIMAL(10,2)
      },
      monto: {
        type: Sequelize.DECIMAL(10,2),
      },
      fecha_limite: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
      },
      credito_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Creditos',
          key: 'id'
        } 
      },
      ci_cliente: {
        type: Sequelize.STRING,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cuota');
  }
};