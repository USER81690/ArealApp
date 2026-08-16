'use strict'


const articlesData = [
  {title: 'Article 1', content: 'Content for article 1'},
  {title: 'Article 2', content: 'Content for article 2'},
  {title: 'Article 3', content: 'Content for article 3'},
  {title: 'Article 4', content: 'Content for article 4'},
  {title: 'Article 5', content: 'Content for article 5'}
]


module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    const articles = articlesData.map(item => ({
      ...item,
      created_at: now,
      updated_at: now
    }))
    await queryInterface.bulkInsert('Articles', articles)
  },


  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Articles', null, {})
  }
}