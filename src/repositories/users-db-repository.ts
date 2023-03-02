import {User} from "../types/types";
import {blogsCollection, usersCollection} from "../db/db";

export const usersRepository = {
    //return ALL USERS
    async returnAllUsers() : Promise <User[]> {
        return usersCollection
            .find({projection: {_id: 0}})
            .toArray()
    },
    async returnUsersCount(searchLoginTerm : string, searchEmailTerm : string) : Promise<number>{
        return blogsCollection
            .find({login: {$regex: searchLoginTerm, $options : 'i'}, email: {$regex: searchEmailTerm, $options : 'i'}})
            .count()
    },
    //return USER BY ID
    async returnUserById(id : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({id: id}, {projection: {_id: 0}})
        return user

    },
    async returnUserByLogin(login : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({login: login}, {projection: {_id: 0}})
        return user

    },
    async returnUserByPassword(password : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({password: password}, {projection: {_id: 0}})
        return user

    },
    //create NEW USER
    async createNewUser(newUser : User) : Promise <User | null> {
        await usersCollection.insertOne(newUser)
        const updatedUser = await this.returnUserById(newUser.id)
        if(updatedUser) {
            return updatedUser
        }
        return null
    },
    //delete USER BY ID
    async deleteUserById(id: string) : Promise<boolean>{
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    //delete ALL DATA
    async deleteAllData(){
        await usersCollection.deleteMany({})
        return []
    }

}