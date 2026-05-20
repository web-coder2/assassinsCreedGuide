import { Router, Request, Response } from "express"

import newCommentsService from "./comments.service"

class CommentsRoute {

    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    init() {
        this.router.post('/create', this.createComment)
        this.router.post('/like', this.addLike)
        this.router.get('/comments', this.getComments)
    }

    private createComment = async(req: Request, res: Response) => {
        try {
            const result = await newCommentsService.createComment(req.body.data)
            res.status(200).json({ result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

    private addLike = async(req: Request, res: Response) => {
        try {
            const result = await newCommentsService.setNewCommentLike(req.body.commentId)
            res.status(200).json({ result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

    private getComments = async(req: Request, res: Response) => {
        try {
            const data = await newCommentsService.getCommentsByQuest(req.query.questId)
            res.status(200).json({ data })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

}

const newCommentsRoute = new CommentsRoute()

export default newCommentsRoute