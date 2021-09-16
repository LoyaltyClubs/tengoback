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
    await queryInterface.bulkInsert('Cliente', [{
      nombre: "Ajley",
      apellido_paterno: "Arroyo",
      apellido_materno: "Cuellar",
      estado_civil: "Soltero",
      fecha_nacimiento: new Date(1994, 8, 18),
      sexo: "Masculino",
      ci: "7842022",
      calle_particular: "Calle 1",
      zona: "El Carmen",
      provincia: "La Guardia",
      barrio: "Condominio Asai 1",
      ciudad_id: 5,
      telefono_celular: "78088232",
      email: "acarroyo94@gmail.com",
      nombre_referencia: "Mery Cuellar",
      telefono_referencia: "70034804",
      tipo_tel_referencia: "Celular",
      parentesco_referencia: "Madre",
      dia_pago: 5,
      linea_credito: 6800,
      empresa_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: "Ana",
      apellido_paterno: "Mercado",
      apellido_materno: "Cabrera",
      estado_civil: "Soltero",
      fecha_nacimiento: new Date(1990, 5, 10),
      sexo: "Femenino",
      ci: "7737738",
      calle_particular: "Enrique Finot",
      zona: "Equipetrol",
      provincia: "Andres Ibañes",
      barrio: "Equpetrol",
      ciudad_id: 5,
      telefono_celular: "7000000",
      email: "aarroyo@loyaltyclubs.net",
      nombre_referencia: "Tatina Espinoza",
      telefono_referencia: "783209320",
      tipo_tel_referencia: "Celular",
      parentesco_referencia: "Tía",
      dia_pago: 5,
      linea_credito: 6000,
      empresa_id: 5,
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
  }
};
