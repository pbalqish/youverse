'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10)
    const dataUser = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin123', salt),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    const dataProfile = [
      {
        fullName: 'admin1',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Users', dataUser, {})
    await queryInterface.bulkInsert('Profiles', dataProfile, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Profiles', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
