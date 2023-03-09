import {
    Request,
    Response,
    Router} from "express";
import {authService} from "../domain/auth-service";
import {jwtService} from "../application/jwt-service";
import {Token, User} from "../types/types";

export const authRouter = Router()

authRouter.post('/login', async (req: Request, res: Response) => {
    const status : boolean = await authService.authRequest(req.body)
    if (status) {
        const user : User | null = await authService.authFindUser(req.body.loginOrEmail)
        if (user) {
            const token : Token = await jwtService.createJWT(user)
            res.status(200).send(token)
        }
    } else {
        res.sendStatus(401)
    }
})