'use strict'


const commentsData = [
  {articleId: 1, text: 'Comment 1 for article 1'},
  {articleId: 1, text: 'Comment 2 for article 1'},
  {articleId: 2, text: 'Comment 1 for article 2'},
  {articleId: 2, text: 'Comment 2 for article 2'},
  {articleId: 3, text: 'Comment 1 for article 3'},
  {articleId: 3, text: 'Comment 2 for article 3'},
  {articleId: 4, text: 'Comment 1 for article 4'},
  {articleId: 4, text: 'Comment 2 for article 4'},
  {articleId: 5, text: 'Comment 1 for article 5'},
  {articleId: 5, text: 'Comment 2 for article 5'}
]


module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    const comments = commentsData.map(item => ({
      ...item,
      created_at: now,
      updated_at: now
    }))
    await queryInterface.bulkInsert('Comments', comments)
  },


  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
}