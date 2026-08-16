import "dotenv/config"
import express from "express"

const PORT = process.env.PORT
const app = express()


app.get("/", (req, res) => {res.send('The server is up')})


app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`)
})