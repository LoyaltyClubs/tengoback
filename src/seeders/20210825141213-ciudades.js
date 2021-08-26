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
    await queryInterface.bulkInsert('Ciudad', [{
      nombre: 'Santa Cruz',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'La Paz',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Cochabamba',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Tarija',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Chuquisaca',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Potosí',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Oruro',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Pando',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Beni',
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
    await queryInterface.bulkDelete('Ciudad', null, {});
  }
};
