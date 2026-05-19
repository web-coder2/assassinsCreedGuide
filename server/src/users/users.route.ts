import { Router, Request, Response } from "express"

import newUsersService from "./users.service"

class UsersRoute {

    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    init() {
        this.router.post('/create', this.createUser)
        this.router.post('/auth', this.userAuth)
        this.router.post('/setRank', this.setNewUserRank)
        this.router.post('/edit', this.editUser)
        this.router.get('/', this.getAll)
        this.router.post('/addLoveQuest', this.addUserLovingQuest)
        this.router.get('/getLoveQuests', this.getLovingQuests)
    }

    private createUser = async (req: Request, res: Response) => {
        try {
            const result = await newUsersService.createUser(req.body.data)
            res.status(200).json({ result: result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

    private getLovingQuests = async (req: Request, res: Response) => {
        try {
            const data = await newUsersService.getLovingQuests(req.query.userId)
            res.status(200).json({ data: data })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

    private addUserLovingQuest = async (req: Request, res: Response) => {
        try {
            const result = await newUsersService.addLovingQuest(req.body.userId, req.body.newQuest)
            res.status(200).json({ result: result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }
    
    private userAuth = async (req: Request, res: Response) => {
        try {
            const result = await newUsersService.userAuth(req.body.login, req.body.password)

            if (result === false) {
                res.status(200).json({ message: 'юзер не найден' })
            } else {
                res.status(200).json({ result: result })
            }

        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }
    
    private setNewUserRank = async (req: Request, res: Response) => {
        try {
            const result = await newUsersService.setNewUserRank(req.body.userId, req.body.newRank)
            res.status(200).json({ result: result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }
    
    private editUser = async (req: Request, res: Response) => {
        try {
            const result = await newUsersService.editUser(req.body.userId, req.body.newUser)
            res.status(200).json({ result: result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }
    
    private getAll = async (req: Request, res: Response) => {
        try {
            const result = await newUsersService.getAll()
            res.status(200).json({ result: result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }
}

const newUsersRoute = new UsersRoute()

export default newUsersRoute