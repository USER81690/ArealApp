import Articles from "./articlesModel.js"
import Comments from "./commentsModel.js"


Articles.hasMany(Comments, {foreignKey: "articleId", onDelete: 'CASCADE'}) // 1 Article - n Comments
Comments.belongsTo(Articles, {foreignKey: "articleId"}) // 1 Comment - 1 Article