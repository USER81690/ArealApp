import express from "express";
import {create, getAll, getOne, update, remove} from "../controllers/commentControllers.js";


const router = express.Router();


router.post("/article/:articleId/comment/", create)
router.get("/article/:articleId/comments/", getAll)
router.get("/article/:articleId/comment/:commentId/", getOne)
router.patch("/article/:articleId/comment/:commentId/", update)
router.delete("/article/:articleId/comment/:commentId/", remove)


export default router