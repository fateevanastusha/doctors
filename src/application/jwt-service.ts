import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {RefreshToken, Token, User} from "../types/types";

export const jwtService = {
    async createJWTAccess (user : User) : Promise <Token>{
        const accessToken = jwt.sign({ userId : user.id }, settings.JWT_SECRET, { expiresIn: '30s' })
        return {
            accessToken : accessToken
        }
    },
    async createJWTRefresh (user : User) : Promise <RefreshToken>{
        const refreshToken = jwt.sign({ userId : user.id }, settings.JWT_SECRET, { expiresIn: '2m' })
        return {
            refreshToken : refreshToken
        }
    },
    async getUserByIdToken (token : string) {
        try {
            const decoded : any = jwt.verify(token, settings.JWT_SECRET);
            return decoded.userId
        } catch (error) {
            return null
        }
    }
}