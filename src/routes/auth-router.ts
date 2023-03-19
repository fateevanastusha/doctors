import {
    Request,
    Response,
    Router} from "express";
import {authService} from "../domain/auth-service";
import {jwtService} from "../application/jwt-service";
import {Token, User} from "../types/types";
import {
    confirmationCodeCheck,
    emailCheck, emailExistingCheck,
    inputValidationMiddleware,
    loginCheck,
    passwordCheck
} from "../middlewares/input-valudation-middleware";
import {usersRouter} from "./users-router";
import {usersService} from "../domain/users-service";
import {businessService} from "../domain/business-service";

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
    const user : User | null = await authService.getUserByToken(token)
    if (user) {
        res.status(200).send(user)
    }
    else {
        res.status(401)
    }
})

//REGISTRATION IN THE SYSTEM

authRouter.post('/registration',
    loginCheck,
    passwordCheck,
    emailCheck,
    inputValidationMiddleware, async (req: Request, res: Response) => {

    let confirmationCode : string = (+new Date()).toString()

    //CREATE NEW USER
    const user : User | null = await usersService.createNewUser(req.body, false, confirmationCode)
    if (!user) {
        res.sendStatus(404)
    }
    //SEND EMAIL
    await businessService.sendConfirmationCode(req.body.email, confirmationCode)
    if (confirmationCode) {
        res.sendStatus(204)
    }

})

//CODE CONFIRMATION

authRouter.post('/registration-confirmation', confirmationCodeCheck, inputValidationMiddleware, async (req: Request, res: Response) => {
    const confirmationCode : string = req.body.code
    const status = await authService.checkForConfirmationCode(confirmationCode)
    if (!status) {
        res.sendStatus(400)
    } else {
        res.sendStatus(204)
    }
})

//RESEND CODE CONFIRMATION

authRouter.post('/registration-email-resending', emailExistingCheck, inputValidationMiddleware, async (req: Request, res: Response) => {

        let confirmationCode : string = (+new Date()).toString()
        let email : string = req.body.email

        //UPDATE CONFIRMATION CODE
        const status = await authService.updateConfirmationCode(confirmationCode, email)
        if (!status) {
            res.sendStatus(400)
        }
        //SEND EMAIL
        await businessService.sendConfirmationCode(req.body.email, confirmationCode)
        if (confirmationCode) {
            res.sendStatus(204)
        }

    })