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

//GET INFORMATION ABOUT CURRENT AUTH

authRouter.get('/me', async (req: Request, res: Response) => {
    const token : string = req.body.accessToken
    console.log(token)
    const user : User | null = await authService.getUserByToken(token)
    console.log(user)
    if (user) {
        res.status(200).send(user)
    }
    else {
        res.status(401)
    }
})

//REGISTRATION IN THE SYSTEM

authRouter.post('/registration', async (req: Request, res: Response) => {

})