import {authRepository} from "../repositories/auth-db-repository";
import {Auth, Token, User} from "../types/types";
import {jwtService} from "../application/jwt-service";
import {usersService} from "./users-service";

export const authService = {
    async authRequest (auth : Auth) : Promise<boolean> {
        const loginOrEmail = auth.loginOrEmail
        const password = auth.password
        return await authRepository.authRequest(
            loginOrEmail,
            password
        )
    },
    async getUserByToken (token : string) : Promise<User | null> {
        const userId : string = await jwtService.getUserByIdToken(token)
        const user : User | null = await usersService.getUserById(userId)
        return user
    },
    async authFindUser (loginOrEmail : string) : Promise<User | null> {
        return await authRepository.authFindUser(
            loginOrEmail
        )
    },
}