'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Rubro', [{
    nombre: 'Tecnológico',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
      nombre: 'Industrial',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Alimenticio',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Electrodomésticos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Salud y Belleza',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Supermercado',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Automotriz',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Farmacias',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Tiendas de Regalo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Rubro', null, {});
  }
};
