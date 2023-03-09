import {Auth, User} from "../types/types";
import {usersRepository} from "./users-db-repository";
import bcrypt from "bcrypt";

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
        const user : User | null = await usersRepository.returnUserByField(loginOrEmail)
        return user
    },
}