import { Router, Request, Response } from "express"

import questsModel from "./quests.model"
import newQuestService from "./quests.service"

class QuestsRouter {

    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    private init() {
        this.router.get('/', this.getAll)
        this.router.get('/title', this.getByTitle)
        this.router.post('/create', this.createQuest)
        this.router.post('/edit', this.editQuest)
    }

    private getAll = async (req: Request, res: Response) => {
        try {
            const data: any = await newQuestService.getAll()
            res.status(200).json({ data })
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    private getByTitle = async (req: Request, res: Response) => {
        try {
            const data: any = await newQuestService.getByTitle(req.query.title)
            res.status(200).json({ data })
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    private createQuest = async (req: Request, res: Response) => {
        try {
            const result: any = await newQuestService.createQuest(req.body.data)
            res.status(200).json({ result })
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

    private editQuest = async (req: Request, res: Response) => {
        try {
            const result: any = await newQuestService.editQuest(req.body.newData, req.body.questId)
            res.status(200).json({ result })
        } catch (e: any) {
            res.status(500).json({ error: e.message })
        }
    }

}

const newQuestRouter = new QuestsRouter

export default newQuestRouter