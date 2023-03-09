import {authRepository} from "../repositories/auth-db-repository";
import {Auth, User} from "../types/types";

export const authService = {
    async authRequest (auth : Auth) : Promise<boolean> {
        const loginOrEmail = auth.loginOrEmail
        const password = auth.password
        return await authRepository.authRequest(
            loginOrEmail,
            password
        )
    },
    async authFindUser (loginOrEmail : string) : Promise<User | null> {
        return await authRepository.authFindUser(
            loginOrEmail
        )
    },
}