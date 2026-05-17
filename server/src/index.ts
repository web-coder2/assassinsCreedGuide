import express, { Express } from "express"
import bodyParser from "body-parser"
import dayjs from "dayjs"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from 'path'
import { Request, Response, NextFunction } from "express"

import newQuestRouter from "./quests/quests.route"
import newCommentsRoute from "./comments/comments.route"
import newUsersRoute from "./users/users.route"

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_PORT = process.env.DATABASE_PORT
const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME

const port: number = 3000

const server: Express = express()

server.use(bodyParser.json())

// Подключение модулей
server.use('/api/quests', newQuestRouter.router)
server.use('/api/comments', newCommentsRoute.router)
server.use('/api/users', newUsersRoute.router)

// TODO написать потом мидлвар чтобы если нет /api/ то ретурнить index.html (скомпилированый vue)
server.use((req: Request, res: Response, next: NextFunction) => {

    const reqQuery = req.path

    if (reqQuery.includes('/api/')) {
        console.log('Request path:', reqQuery);
        next()
    } else {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        console.log('client interfface path: ', reqQuery)
    }

})

async function connectMongo() {
    try {
        const uri = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`
        await mongoose.connect(uri)
    } catch (err) {
        console.log(err)
    }
}

server.listen(port, () => {
    connectMongo()
    console.log(`server running on 127.0.0.1:${port}`)
})