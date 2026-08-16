import Comments from "../models/commentsModel.js"
import Articles from "../models/articlesModel.js"


const create = async (req, res) => {
    try {
        const article = await Articles.findByPk(req.params.articleId)
        if (!article) {
            return res.status(404).json({message: "Article not found" })
        }
        const comment = await Comments.create({
            ...req.body,
            articleId: req.params.articleId
        })
        res.json(comment)
    } catch (error) {
        console.error(`Error retrieving comment\n${error}`)
        res.status(500).json({message: "Error creating comment"})
    }
}


const getAll = async (req, res) => {
    try {
        const comments = await Comments.findAll({
            where: {articleId: req.params.articleId}
        })
        if (!comments) {
            return res.status(404).json({message: "Comments not found"})
        }
        res.json(comments)
    } catch (error) {
        console.error(`Failed to create the list of comments\n${error}`)
        res.status(500).json({message: "Failed to create the list of comments"})
    }
}


const getOne = async (req, res) => {
    try {
        const comment = await Comments.findOne({
            where: {
                id: req.params.commentId,
                articleId: req.params.articleId
            }
        })
        if (!comment) {
            return res.status(404).json({message: "Comment not found"})
        }
        res.json(comment)
    } catch (error) {
        console.error(`Error retrieving comment\n${error}`)
        res.status(500).json({message: "Error retrieving comment"})
    }
}


const update = async (req, res) => {
    try {
        const comment = await Comments.findOne({
            where: {
                id: req.params.commentId,
                articleId: req.params.articleId
            }
        })
        if (!comment) {
            return res.status(404).json({message: "Comment not found"})
        }
        await comment.update(req.body)
        res.json(comment)
    } catch (error) {
        console.error(`Error updating comment\n${error}`)
        res.status(500).json({message: "Error updating article"})
    }
}


const remove = async (req, res) => {
    try {
        const comment = await Comments.findOne({
            where: {
                id: req.params.commentId,
                articleId: req.params.articleId
            }
        })
        if (!comment) {
            return res.status(404).json({message: "Comment not found"})
        }
        await comment.destroy()
        res.status(204).send()
    } catch (error) {
        console.error(`Error deleting comment\n${error}`)
        res.status(500).json({message: "Error deleting comment"})
    }
}


export {create, getAll, getOne, update, remove}