import { Router, Request, Response } from 'express'
import dayjs from 'dayjs'
import axios from 'axios'

import versionsService from './versions.service'
import versionsModel from './versions.model'

class VersionsRoute {

    public router: Router

    constructor() {
        this.router = Router()
        this.init()
    }

    init() {
        this.router.post('/create', this.createNewVersion)
        this.router.get('/versionsList', this.getAllVersions)
    }

    private async createNewVersion(req: Request, res: Response) {
        try {
            const result = await versionsService.createNewVersion(req.body.data)
            res.status(201).json({ result: result })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

    private async getAllVersions(req: Request, res: Response) {
        try {
            const data = await versionsService.getAllVersions()
            res.status(201).json({ data: data })
        } catch (e: any) {
            console.log(e.message)
            res.status(500).json({ err: e.message })
        }
    }

}

const newVersionsRoute = new VersionsRoute()

export default newVersionsRoute