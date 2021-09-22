'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cuota_Mensual', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      monto_total: {
        type: Sequelize.DECIMAL(10,2)
      },
      monto_capital:{
        type: Sequelize.DECIMAL(10,2)
      },
      interes: {
        type: Sequelize.DECIMAL(10,2)
      },
      estado: {
        type: Sequelize.STRING
      },
      mora: {
        type: Sequelize.DECIMAL(10,2)
      },
      fecha: {
        type: Sequelize.DATEONLY
      },
      gastos_cobranza: {
        type: Sequelize.DECIMAL(10,2)
      },
      ci_cliente: {
        type: Sequelize.STRING
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cliente',
          key: 'id'
        }
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
    await queryInterface.dropTable('Cuota_Mensual');
  }
};