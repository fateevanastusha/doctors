import {User} from "../types/types";
import {blogsCollection, usersCollection} from "../db/db";

export const usersRepository = {
    //return ALL USERS
    async returnAllUsers() : Promise <User[]> {
        return usersCollection
            .find({projection: {_id: 0, password : 0, isConfirmed: 0, confirmedCode : 0}})
            .toArray()
    },
    async returnUsersCount(searchLoginTerm : string, searchEmailTerm : string) : Promise<number>{
        return usersCollection.countDocuments({
                $or: [
                    {login: {$regex: searchLoginTerm, $options: 'i'}},
                    {email: {$regex: searchEmailTerm, $options: 'i'}}
                ]
        })
    },
    //return USER BY ID
    async returnUserById(id : string) : Promise <User | null> {
       return usersCollection
            .findOne({id: id}, {projection: {_id: 0, password : 0,  isConfirmed: 0, confirmedCode : 0}})

    },
    //return USER BY FIELD
    async returnUserByField(field : string) : Promise <User | null> {
        const user = await usersCollection
            .findOne({$or : [{login: field} , {email: field}]})
        return user


    },
    //get USER BY LOGIN
    async returnUserByLogin(login : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({login : login}, {projection: {_id: 0}})
        return user

    },
    //get USER BY EMAIL OR LOGIN
    async returnUserByEmail(email : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({email : email}, {projection: {_id: 0}})
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