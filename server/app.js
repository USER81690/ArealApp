import "dotenv/config"
import express from "express"
import sequelize from "./sequelize.js"
import articleRoutes from "./routes/articleRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import "./models/associations.js"


const PORT = process.env.PORT
const app = express()


app.use(express.json())
app.use(articleRoutes)
app.use(commentRoutes)


app.get("/", (req, res) => {res.send()})


const start = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection to the DBMS")
        app.listen(PORT, () => {
            console.log(`The server is running on port: ${PORT}`)
        })
    } catch (error) {
        if (error.name == "SequelizeConnectionError") {
            console.log("Error when connecting to the DBMS")
        } else {
            console.log("Error during server startup")
        }
    }
}; start()