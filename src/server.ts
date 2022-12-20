import express, { Request, Response } from "express"
import { load, getMethod, postMethod, deleteMethod } from "./function"
const server = express()
const PORT = 8080
server.use(express.json())
// Get Method
server.get("/note", getMethod)
// Post Method
server.post("/note", postMethod)
// Delete one note by ID
server.delete("/note/:id", deleteMethod)
server.listen(PORT, () => {
    load()
    console.log(`Server: http://localhost:${PORT}`)
})