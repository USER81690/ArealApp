import Articles from "../models/articlesModel.js"


const create = async (req, res, next) => {
    try {
        const article = await Articles.create({...req.body})
        res.json(article)
    } catch (error) {
        console.error(`Error creating article\n${error}`)
        res.status(500).json({message: "Error creating article"})
    }
}


const getAll = async (req, res) => {
    try {
        const articles = await Articles.findAll()
        if (!articles) {
            return res.status(404).json({message: "Articles not found"})
        }
        res.json(articles)
    } catch (error) {
        console.error(`Failed to create the list of articles\n${error}`)
        res.status(500).json({message: "Failed to create the list of articles"})
    }
}


const getOne = async (req, res) => {
    try {
        const article = await Articles.findByPk(req.params.id)
        if (!article) {
            return res.status(404).json({message: "Article not found"})
        }
        res.json(article)
    } catch (error) {
        console.error(`Error retrieving article\n${error}`)
        res.status(500).json({message: "Error retrieving article"})
    }
}


const update = async (req, res) => {
    try {
        const article = await Articles.findByPk(req.params.id)
        if (!article) {
            return res.status(404).json({message: "Article not found"})
        }
        await article.update(req.body)
        res.json(article)
    } catch (error) {
        console.error(`Error updating article\n${error}`)
        res.status(500).json({message: "Error updating article"})
    }
}


const remove = async (req, res) => {
    try {
        const article = await Articles.findByPk(req.params.id)
        if (!article) {
            return res.status(404).json({message: "Article not found"})
        }
        await article.destroy()
        res.status(204).send()
    } catch (error) {
        console.error(`Error deleting article\n${error}`)
        res.status(500).json({message: "Error deleting article"})
    }
}


export {create, getAll, getOne, update, remove}