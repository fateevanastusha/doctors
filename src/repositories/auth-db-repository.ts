import {RefreshToken, User} from "../types/types";
import {tokenBlackListCollection} from "../db/db";
import {usersRepository} from "./users-db-repository";
import bcrypt from "bcrypt";

export const authRepository = {

    //AUTH

    async authRequest(loginOrEmail: string, password: string) : Promise <boolean> {

        //find by loginOrEmail

        const user : User | null = await usersRepository.returnUserByField(loginOrEmail)
        if (user) {
            return bcrypt.compareSync(password, user.password)
        } else {
            return false
        }
    },

    //CHECK FOR REFRESH TOKEN IN BLACK LIST

    async checkRefreshToken(refreshToken : string) : Promise <boolean> {
        //find by loginOrEmail
        const status : RefreshToken | null =  await tokenBlackListCollection.findOne({refreshToken : refreshToken})
        if (status) {
            return true
        } else {
            return false
        }
    },

    //ADD REFRESH TOKEN TO BLACK LIST

    async addRefreshTokenToBlackList(refreshToken : string) : Promise <boolean> {
        //find by loginOrEmail
        await tokenBlackListCollection.insertOne({refreshToken : refreshToken})
        const status = await this.checkRefreshToken(refreshToken)
        if (status) {
            return true
        } else {
            return false
        }
    }

}