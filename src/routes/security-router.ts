import {Router} from 'express'
import {checkForDeviceId, checkForRefreshToken, checkForSameUser} from "../middlewares/auth-middlewares";
import {SecurityController} from "../controllers/security-controller";

export const securityRouter = Router()
const securityController = new SecurityController()

//GET ALL SESSIONS

securityRouter.get('/devices',
    checkForRefreshToken,
    securityController.getAllSessions.bind(securityController)
)

//DELETE ALL SESSIONS

securityRouter.delete('/devices',
    checkForRefreshToken,
    securityController.deleteAllSessions.bind(securityController)
)

//DELETE SESSION

securityRouter.delete('/devices/:id',
    checkForRefreshToken,
    checkForDeviceId,
    checkForSameUser,
    securityController.deleteSession.bind(securityController)
)