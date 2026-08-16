import express from "express"
import {create, getAll, getOne, update, remove} from "../controllers/articleControllers.js"


const router = express.Router()


router.post("/article/", create)
router.get("/articles/", getAll)
router.get("/article/:id/", getOne)
router.patch("/article/:id/", update)
router.delete("/article/:id/", remove)


export default router