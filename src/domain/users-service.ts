import {User} from "../types/types";
import {usersRepository} from "../repositories/users-db-repository";
import {postsRepository} from "../repositories/posts-db-repositiory";


export const usersService = {
    //GET ALL USERS
    async getAllUsers() : Promise<User[]>{
        return await usersRepository.returnAllUsers()
    },
    //CREATE NEW USER
    async createNewUser(user : User) : Promise<User | null>{
        const newUser =  {
            id: '' + (+(new Date())),
            login: user.login,
            email: user.email,
            password : user.password,
            createdAt: new Date().toISOString()
        }
        const createdUser = await usersRepository.createNewUser(newUser)
        return createdUser
    },
    //DELETE BY ID
    async deleteUserById(id: string) : Promise<boolean>{
        return await usersRepository.deleteUserById(id)
    },
    //DELETE ALL DATA
    async deleteAllData(){
        await postsRepository.deleteAllData()
    }
}