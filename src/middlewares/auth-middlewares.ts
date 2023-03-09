import { NextFunction } from "express";
import { Response, Request } from "express";
import { CustomValidator } from "express-validator/src/base";
import { body, validationResult } from 'express-validator';
import {jwtService} from "../application/jwt-service";

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