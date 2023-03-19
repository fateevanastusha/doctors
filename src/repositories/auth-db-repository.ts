import {Auth, User} from "../types/types";
import {usersRepository} from "./users-db-repository";
import bcrypt from "bcrypt";
import {usersCollection} from "../db/db";

export const authRepository = {
    async authRequest(loginOrEmail: string, password: string) : Promise <boolean> {
        //find by loginOrEmail
        const user : User | null = await usersRepository.returnUserByField(loginOrEmail)
        if (user) {
            return bcrypt.compareSync(password, user.password)
        } else {
            return false
        }
    },
    async authFindUser(loginOrEmail: string) : Promise <User | null> {
        //find by loginOrEmail
       return  usersRepository.returnUserByField(loginOrEmail)
    },
    async checkForConfirmationCode (confirmedCode : string) : Promise<boolean> {
        const user = await usersCollection.findOne({confirmedCode : confirmedCode})
        return user !== null
    },
    async changeConfirmatedStatus (confirmedCode : string) : Promise<boolean> {
        const status = await usersCollection.updateOne(
            {confirmedCode : confirmedCode},
            { $set : {
                isConfirmed : true
            }
            })
        return status.matchedCount === 1
    },
    async changeConfirmationCode (confirmationCode : string, email : string) : Promise <boolean> {
        const status = await usersCollection.updateOne(
            {email : email},
            { $set : {
                    confirmedCode : confirmationCode
                }
            })
        return status.matchedCount === 1
    },
    async checkForConfirmedAccount (email : string) : Promise <boolean> {
        const user = await usersCollection.findOne({email : email})
        if (user?.isConfirmed) {
            return true
        } else {
            return false
        }
    },
    async checkForConfirmedCode (code : string) : Promise <boolean> {
        const user = await usersCollection.findOne({confirmedCode : code})
        if (user?.isConfirmed) {
            return true
        } else {
            return false
        }
    }
}