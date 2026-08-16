import "dotenv/config"
import express from "express"
import sequelize from "./sequelize.js"

const PORT = process.env.PORT
const app = express()


app.get("/", (req, res) => {res.send('The server is up')})


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