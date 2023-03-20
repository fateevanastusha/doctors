import {User} from "../types/types";
import {blogsCollection, usersCollection} from "../db/db";

export const usersRepository = {

    //RETURN ALL USERS

    async returnAllUsers() : Promise <User[]> {
        return usersCollection
            .find({projection: {_id: 0, password : 0, isConfirmed: 0, confirmedCode : 0}})
            .toArray()
    },

    //COUNT USERS WITH SEARCH LOGIN TERM AND SEARCH EMAIL TERM

    async returnUsersCount(searchLoginTerm : string, searchEmailTerm : string) : Promise<number>{
        return usersCollection.countDocuments({
                $or: [
                    {login: {$regex: searchLoginTerm, $options: 'i'}},
                    {email: {$regex: searchEmailTerm, $options: 'i'}}
                ]
        })
    },

    //GET USER BY ID

    async returnUserById(id : string) : Promise <User | null> {
       return usersCollection
            .findOne({id: id}, {projection: {_id: 0, password : 0,  isConfirmed: 0, confirmedCode : 0}})

    },

    //GET USER BY FIELD

    async returnUserByField(field : string) : Promise <User | null> {
        const user = await usersCollection
            .findOne({$or : [{login: field} , {email: field}]})
        return user


    },

    //GET USER BY LOGIN

    async returnUserByLogin(login : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({login : login}, {projection: {_id: 0}})
        return user

    },

    //GET USER BY EMAIL OR LOGIN

    async returnUserByEmail(email : string) : Promise <User | null> {
        const user =  usersCollection
            .findOne({email : email}, {projection: {_id: 0}})
        return user

    },

    //CREATE NEW USER

    async createNewUser(newUser : User) : Promise <User | null> {
        await usersCollection.insertOne(newUser)
        const updatedUser = await this.returnUserById(newUser.id)
        if(updatedUser) {
            return updatedUser
        }
        return null
    },

    //DELETE USER BY ID

    async deleteUserById(id: string) : Promise<boolean>{
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    //CHECK FOR CONFIRMATION CODE

    async checkForConfirmationCode (confirmedCode : string) : Promise<boolean> {
        const user = await usersCollection.findOne({confirmedCode : confirmedCode})
        return user !== null
    },

    //CHANGE CONFIRMATION STATUS

    async changeConfirmedStatus (confirmedCode : string) : Promise<boolean> {
        const status = await usersCollection.updateOne(
            {confirmedCode : confirmedCode},
            { $set : {
                    isConfirmed : true
                }
            })
        return status.matchedCount === 1
    },

    //CHANGE CONFIRMATION CODE

    async changeConfirmationCode (confirmationCode : string, email : string) : Promise <boolean> {
        const status = await usersCollection.updateOne(
            {email : email},
            { $set : {
                    confirmedCode : confirmationCode
                }
            })
        return status.matchedCount === 1
    },

    //CHECK FOR CONFIRMED ACCOUNT

    async checkForConfirmedAccountByEmailOrCode (emailOrCode : string) : Promise <boolean> {
        const user = await usersCollection.findOne({$or: [{email: emailOrCode}, {confirmedCode: emailOrCode}]})
        if (user?.isConfirmed) {
            return true
        } else {
            return false
        }
    },

    //DELETE ALL DATA

    async deleteAllData(){
        await usersCollection.deleteMany({})
        return []
    }

}