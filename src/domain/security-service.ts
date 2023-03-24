import {RefreshTokensMeta} from "../types/types";
import {securityRepository} from "../repositories/security-db-repository";
import {jwtService} from "../application/jwt-service";

export const securityService = {
    async getAllSessions(refreshToken : string) : Promise<RefreshTokensMeta[] | null> {
        const idList = await jwtService.getIdByRefreshToken(refreshToken)
        if(!idList) return null
        const deviceId = idList.deviceId
        return await securityRepository.getAllSessions(deviceId)
    },
    async deleteAllSessions(refreshToken : string) : Promise<boolean> {
        const idList = await jwtService.getIdByRefreshToken(refreshToken)
        if(!idList) return false
        return await securityRepository.deleteAllSessions(idList.deviceId, idList.userId)
    },
    async deleteOneSession(deviceId : string) : Promise<boolean> {
        return await securityRepository.deleteOneSessions(deviceId)
    }
}