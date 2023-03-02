import {
    Request,
    Response,
    Router} from "express";
import {authService} from "../domain/auth-service";

export const authRouter = Router()

authRouter.post('/', async (req: Request, res: Response) => {
    const status : boolean = await authService.authRequest(req.body)
    if (status) {
        res.send(200)
    } else {
        res.send(400)
    }
})