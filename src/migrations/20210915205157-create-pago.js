'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro_transaccion: {
        type: Sequelize.STRING
      },
      fecha_transaccion: {
        type: Sequelize.DATE
      },
      nro_vendedor: {
        type: Sequelize.INTEGER
      },
      forma_pago: {
        type: Sequelize.INTEGER
      },
      monto_abonado: {
        type: Sequelize.DECIMAL(10,2)
      },
      nro_comprobante: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Pagos');
  }
};