import {Request, Response} from 'express'
import { Router } from "express"
import {securityService} from "../domain/security-service";
import {RefreshTokensMeta} from "../types/types";

export const securityRouter = Router()

//GET ALL SESSIONS

securityRouter.get('/devices', async (req: Request, res: Response) => {
    const sessions : RefreshTokensMeta[] | null = await securityService.getAllSessions(req.cookies.refreshToken)
    if (sessions) {
        res.status(200).send(sessions)
    } else {
        res.status(401)
    }
})

//DELETE ALL SESSIONS

securityRouter.delete('/devices', async (req: Request, res: Response) => {
    const status : boolean = await securityService.deleteAllSessions(req.cookies.refreshToken)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }
})

//DELETE SESSION

securityRouter.delete('/devices/:id', async (req: Request, res: Response) => {
    const status : boolean = await securityService.deleteOneSession(req.params.id)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})