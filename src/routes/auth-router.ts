import {
    Request,
    Response,
    Router} from "express";
import {authService} from "../domain/auth-service";
import {Token, TokenList, User} from "../types/types";
import {
    codeConfirmationCheck,
    emailCheck,
    emailConfirmationCheck,
    inputValidationMiddleware,
    loginCheck,
    passwordCheck
} from "../middlewares/input-valudation-middleware";
import {checkForExistingRefreshToken, checkForRefreshToken} from "../middlewares/auth-middlewares";


export const authRouter = Router()

//LOGIN REQUEST

authRouter.post('/login', async (req: Request, res: Response) => {
    const tokenList : TokenList | null = await authService.authRequest(req.body)
    if (tokenList) {
        let token : Token = {
            accessToken : tokenList.accessToken
        }
        res.cookie('refreshToken', tokenList.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send(token)
    } else {
        res.sendStatus(401)
    }
})

//GET INFORMATION ABOUT CURRENT AUTH

authRouter.get('/me',
    async (req: Request, res: Response) => {

    const user : User | null = await authService.getInformationAboutCurrentUser(req.body.accessToken)
    if (user) {
        res.status(200).send(user)
    } else {
        res.sendStatus(401)
    }

})

//REGISTRATION IN THE SYSTEM

authRouter.post('/registration',
    loginCheck,
    passwordCheck,
    emailCheck,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const status : boolean = await authService.registrationUser(req.body);

    if(status) {
        res.send(204);
    } else {
        res.send(404);
    };

})

//CODE CONFIRMATION

authRouter.post('/registration-confirmation',
    codeConfirmationCheck,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const status = await authService.checkForConfirmationCode(req.body.code)
    if (!status) {
        res.sendStatus(400)
    } else {
        res.sendStatus(204)
    }

})

//RESEND CODE CONFIRMATION

authRouter.post('/registration-email-resending',
    emailConfirmationCheck,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const status : boolean = await authService.emailResending(req.body)
        if (status) {
            res.send(204)
        } else {
            res.send(400)
        }

})

//LOGOUT. KILL REFRESH TOKEN

authRouter.post('/logout', checkForExistingRefreshToken, checkForRefreshToken, async (req: Request, res: Response) => {
    const status : boolean = await authService.addRefreshTokenToBlackList(req.cookies.refreshToken)
    if (!status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }

})

//REFRESH TOKEN

authRouter.post('/refresh-token', checkForExistingRefreshToken, checkForRefreshToken, async (req: Request, res: Response) => {
    const tokenList : TokenList | null = await authService.createNewToken(req.cookies.refreshToken)
    if (tokenList) {
        let token : Token = {
            accessToken : tokenList.accessToken
        }
        res.cookie('refreshToken', tokenList.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send(token)
    } else {
        res.sendStatus(401)
    }
})


