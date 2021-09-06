'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Creditos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      nro_cuotas: {
        type: Sequelize.INTEGER
      },
      monto_financiado: {
        type: Sequelize.DECIMAL
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cliente',
          key: 'id'
        }

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
    await queryInterface.dropTable('Creditos');
  }
};