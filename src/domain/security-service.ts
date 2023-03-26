import {RefreshTokensMeta} from "../types/types";
import {securityRepository} from "../repositories/security-db-repository";
import {jwtService} from "../application/jwt-service";
//const createError = require('http-errors');

export const securityService = {
    async getAllSessions(refreshToken : string) : Promise<RefreshTokensMeta[] | null> {
        const idList = await jwtService.getIdByRefreshToken(refreshToken)
        if(!idList) return null
        const userId = idList.userId
        return await securityRepository.getAllSessions(userId)
    },
    async deleteAllSessions(refreshToken : string) : Promise<boolean> {
        const idList = await jwtService.getIdByRefreshToken(refreshToken)
        if(!idList) return false
        return await securityRepository.deleteAllSessions(idList.deviceId, idList.userId)
    },
    async deleteOneSession(deviceId : string) : Promise<boolean> {
        return await securityRepository.deleteOneSessions(deviceId)
    },
    async deleteOneSession1(deviceId : string, refreshToken : string) : Promise<boolean> {
        if(!refreshToken) return false
        const user = await jwtService.getIdByRefreshToken(refreshToken)
        if (!user) return false
        const device = await securityRepository.findSessionByDeviceId(deviceId)
        if (!device) return false
        //if (user.userId !== device.deviceId) throw new createError(401);
        return securityRepository.deleteAllSessions(deviceId,user.userId)
    },
    async checkForSameDevice(title : string, userId : string) : Promise<boolean> {
        return await securityRepository.checkSameDevice(title,userId)
    }
}