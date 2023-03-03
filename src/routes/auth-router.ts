import {
    Request,
    Response,
    Router} from "express";
import {authService} from "../domain/auth-service";

export const authRouter = Router()

authRouter.post('/login', async (req: Request, res: Response) => {
    const status : boolean = await authService.authRequest(req.body)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(401)
    }
})