'use strict'


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      title: {type: Sequelize.STRING, allowNull: false},
      content: {type: Sequelize.TEXT, allowNull: false},
      created_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updated_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    })
  },


  down: async (queryInterface) => {
    await queryInterface.dropTable('Articles')
  }
}