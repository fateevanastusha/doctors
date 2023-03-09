import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";
import {settings} from "../settings";
import {Token, User} from "../types/types";

export const jwtService = {
    async createJWT (user : User) : Promise <Token>{
        const token = jwt.sign({ userId : user.id }, settings.JWT_SECRET, { expiresIn: '1h' })
        return {
            accessToken : token
        }
    },
    async getUserByIdToken (token : string) {
        try {
            var decoded : any = jwt.verify(token, settings.JWT_SECRET);
            return new ObjectId(decoded.userId)
        } catch (error) {
            return null
        }
    }
}