'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empresa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      razon_social: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rubro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rubro',
          key: 'id'
        }
      },
      direccion: {
        type: Sequelize.STRING
      },
      ciudad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ciudad',
          key: 'id'
        }
      },
      fecha_cierre: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      inicio_contrato: {
        type: Sequelize.DATE
      },
      fin_contrato: {
        type: Sequelize.DATE
      },
      representante_legal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ci: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expedicion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'plan',
          key: 'id'
        }
      },
      dias_gracia: {
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Empresa');
  }
};