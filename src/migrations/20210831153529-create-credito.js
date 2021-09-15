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
      secuencia: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
      },
      nro_cuotas: {
        type: Sequelize.INTEGER
      },
      monto_capital: {
        type: Sequelize.DECIMAL(10,2)
      },
      monto_financiado: {
        type: Sequelize.DECIMAL(10,2)
      },
      monto_cuota: {
        type: Sequelize.DECIMAL(10,2)
      },
      mora: {
        type: Sequelize.DECIMAL(10,2)
      },
      fecha_primer_cuota: {
        type: Sequelize.DATE
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