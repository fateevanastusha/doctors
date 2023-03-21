import {authRepository} from "../repositories/auth-db-repository";
import {Auth, RefreshToken, Token, TokenList, User} from "../types/types";
import {jwtService} from "../application/jwt-service";
import {usersService} from "./users-service";
import {usersRepository} from "../repositories/users-db-repository";
import {businessService} from "./business-service";

export const authService = {
    async authRequest (auth : Auth) : Promise<TokenList | null> {
        const loginOrEmail = auth.loginOrEmail
        const password = auth.password
        const status = await authRepository.authRequest(loginOrEmail, password)
        if (status) {
            const user : User | null = await authService.authFindUser(auth.loginOrEmail)
            if (user) {
                const accessToken : Token = await jwtService.createJWTAccess(user)
                const refreshToken : RefreshToken = await jwtService.createJWTRefresh(user)
                return {
                    accessToken : accessToken.accessToken,
                    refreshToken : refreshToken.refreshToken
                }
            }
            else {
                return null
            }
        } else {
            return null
        }
    },
    //CREATE NEW TOKENS

    async createNewToken (refreshToken : string) : Promise<TokenList | null> {
        //ADD OLD REFRESH TOKEN IN BLACK LIST
        await authRepository.addRefreshTokenToBlackList(refreshToken)
        const userId : string = await jwtService.getUserByIdToken(refreshToken)
        const user = await usersService.getUserById(userId)
        if (user === null) {
            return null
        }
        const accessToken : Token = await jwtService.createJWTAccess(user)
        const newRefreshToken : RefreshToken = await jwtService.createJWTRefresh(user)
        return {
            accessToken : accessToken.accessToken,
            refreshToken : newRefreshToken.refreshToken
        }
    },

    async addRefreshTokenToBlackList (refreshToken : string) : Promise<boolean> {
        //ADD OLD REFRESH TOKEN IN BLACK LIST
        return await authRepository.addRefreshTokenToBlackList(refreshToken)
    },


    //GET USER BY TOKEN

    async getUserByToken (token : string) : Promise<User | null> {
        const userId : string = await jwtService.getUserByIdToken(token)
        const user : User | null = await usersService.getUserById(userId)
        return user
    },

    //FIND USER BY LOGIN OR EMAIL

    async authFindUser (loginOrEmail : string) : Promise<User | null> {
        return await usersRepository.returnUserByField(
            loginOrEmail
        )
    },

    //

    async checkForConfirmationCode (confirmationCode : string) : Promise <boolean>  {
        return await usersRepository.changeConfirmedStatus(confirmationCode)

    },

    //UPDATE CONFIRMATION CODE

    async updateConfirmationCode (confirmationCode : string, email : string) : Promise <boolean> {
        return usersRepository.changeConfirmationCode(confirmationCode,email)
    },

    //REGISTRATION USER

    async registrationUser (user: User) : Promise <boolean> {

        let confirmationCode : string = (+new Date()).toString()

        //CREATE NEW USER

        const newUser : User | null = await usersService.createNewUser(user, false, confirmationCode)
        if (!newUser) {
            return false
        }
        //SEND EMAIL

        await businessService.sendConfirmationCode(user.email, confirmationCode)
        return true

    },

    //EMAIL RESENDING

    async emailResending (user: User) : Promise <boolean> {

        let confirmationCode : string = (+new Date()).toString()
        let email : string = user.email

        //UPDATE CONFIRMATION CODE

        const status = await authService.updateConfirmationCode(confirmationCode, email)
        if (!status) {
            return false
        }
        //SEND EMAIL

        await businessService.sendConfirmationCode(user.email, confirmationCode)
        return true

    },

    //GET INFORMATION ABOUT CURRENT USER

    async getInformationAboutCurrentUser (accessToken : string) : Promise <User | null> {

        const token : string = accessToken
        const getUser : User | null = await authService.getUserByToken(token)

        if (getUser) {
            return getUser
        }
        else {
            return null
        }

    }

}