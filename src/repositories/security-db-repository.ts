import {RefreshTokensMeta} from "../types/types";
import {postsCollection, refreshTokensCollection} from "../db/db";

export const securityRepository ={
    async getAllSessions(userId : string) : Promise<RefreshTokensMeta[] | null> {
        return refreshTokensCollection
            .find({userId}, {projection : {_id : 0, userId : 0}})
            .toArray()
    },

    async deleteAllSessions(deviceId : string, userId : string) : Promise<boolean> {
        const result = await refreshTokensCollection
            .deleteMany({
                userId,
                deviceId : {$ne : deviceId}
            })
        return result.deletedCount > 0
    },
    async deleteOneSessions(deviceId : string) : Promise<boolean> {
        const result = await refreshTokensCollection
            .deleteOne({deviceId})
        return result.deletedCount === 1
    },
    async createNewSession(refreshTokensMeta : RefreshTokensMeta) : Promise<boolean> {
        await refreshTokensCollection
            .insertOne({
                userId : refreshTokensMeta.userId,
                ip: refreshTokensMeta.ip,
                title: refreshTokensMeta.title,
                lastActiveDate: refreshTokensMeta.lastActiveDate,
                deviceId: refreshTokensMeta.deviceId
            });
        const createdSession = await this.findSessionByIp(refreshTokensMeta.ip);
        if (createdSession) return true;
        return false;


    },
    async findSessionByIp(ip : string) : Promise<RefreshTokensMeta | null> {
        return refreshTokensCollection
            .findOne({ip: ip})
    },
    async findSessionByDeviceId(deviceId: string) : Promise<RefreshTokensMeta | null> {
        return refreshTokensCollection
            .findOne({deviceId: deviceId})
    },
    async updateSession(ip : string, title : string, lastActiveDate : string, deviceId : string) : Promise<boolean>{
        const result = await refreshTokensCollection
            .updateOne({deviceId : deviceId},
                {
                ip: ip,
                title: title,
                lastActiveDate: lastActiveDate,
                deviceId: deviceId
            });
        return result.matchedCount === 1;
    },
    //DELETE ALL DATA
    async deleteAllData() {
        await refreshTokensCollection.deleteMany({});
        return [];
    },
    //CHECK FOR THE SAME SESSION
    async checkSameDevice(title : string, userId : string) : Promise<boolean> {
        const result = await refreshTokensCollection.find({title: title, userId : userId})
        if (result) return true
        return false
    }


}