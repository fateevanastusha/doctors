import jwt from 'jsonwebtoken'
import {settings} from "../settings";
import {RefreshToken, Token, User} from "../types/types";
import exp from "constants";

export const jwtService = {
    async createJWTAccess (userId : string) : Promise <Token>{
        const accessToken = jwt.sign({ userId : userId }, settings.JWT_SECRET, { expiresIn: '10s' })
        return {
            accessToken : accessToken
        }
    },
    async createJWTRefresh (userId : string, deviceId: string) : Promise <RefreshToken>{
        const refreshToken = jwt.sign({ userId : userId, deviceId: deviceId }, settings.JWT_SECRET, { expiresIn: '20s' })
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
    },
    async getIdByRefreshToken (token : string) {
        try {
            const decoded : any = jwt.verify(token, settings.JWT_SECRET);
            return {
                    userId : decoded.userId,
                    deviceId : decoded.deviceId
                }
        } catch (error) {
            return null
        }
    },
    async getRefreshTokenDate (token : string) {
        try {
            const decoded : any = jwt.verify(token, settings.JWT_SECRET);
            return decoded.iat
        } catch (error) {
            return null
        }
    }
}