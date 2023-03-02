import {authRepository} from "../repositories/auth-db-repository";

export const authService = {
    async authRequest (auth : Auth) : Promise<boolean> {
        return await authRepository(auth)
    }
}