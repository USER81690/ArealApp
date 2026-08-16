'use strict'


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      articleId: {type: Sequelize.INTEGER, allowNull: false, references: { model: 'Articles', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE'},
      text: {type: Sequelize.TEXT, allowNull: false},
      created_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updated_at: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    })
  },

  
  down: async (queryInterface) => {
    await queryInterface.dropTable('Comments')
  }
}