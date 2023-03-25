import { NextFunction } from "express";
import { Response, Request } from "express";
import {jwtService} from "../application/jwt-service";
import {commentsService} from "../domain/comments-service";
import {authRepository} from "../repositories/auth-db-repository";
import {deflateRaw} from "zlib";
import {RefreshTokensMeta} from "../types/types";
import {securityRepository} from "../repositories/security-db-repository";


export const authMiddlewares = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
    } else {
        //req.headers.authorization - "bearer fsfsdrgrgwerwgwg"
        const token : string = req.headers.authorization.split(" ")[1]
        const user = await jwtService.getUserByIdToken(token)
        if (user) {
            next()
        } else {
            res.sendStatus(401);
        }
    }
}
export const checkForUser = async (req: Request, res: Response, next: NextFunction) => {
    const token : string = req.headers.authorization!.split(" ")[1]
    const userId = await jwtService.getUserByIdToken(token)
    const comment = await commentsService.getCommentById(req.params.id)
    if (!comment) {
        res.sendStatus(404)
    }
    else if (comment.commentatorInfo.userId === userId) {
        next()
    } else {
        res.sendStatus(403)
    }
}

export const checkForRefreshToken = async (req: Request, res: Response, next: NextFunction) => {

    //CHECK FOR EXISTING REFRESH TOKEN
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(401)
    //CHECK FOR NOT BLOCKED REFRESH TOKEN
    const isTokenBlocked : boolean = await authRepository.checkRefreshToken(refreshToken)
    if (isTokenBlocked) return res.sendStatus(401)
    //CHECK FOR EXISTING SESSION WITH THIS REFRESH TOKEN
    const tokenList = await jwtService.getIdByRefreshToken(refreshToken)
    if (!tokenList) return res.sendStatus(401)
    const session : RefreshTokensMeta | null = await securityRepository.findSessionByDeviceId(tokenList.deviceId)
    if (!session) return res.sendStatus(401)
    const userId = await jwtService.getIdByRefreshToken(refreshToken)
    if (userId) {
        next()
    } else {
        res.sendStatus(401)
    }
}
