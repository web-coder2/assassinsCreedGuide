import express, { Express } from "express"
import bodyParser from "body-parser"
import dayjs from "dayjs"
import mongoose from "mongoose"

const port: number = 3000

const server: Express = express()

server.use(bodyParser.json())

server.listen(port, () => {
    console.log(`server running on 127.0.0.1:${port}`)
})