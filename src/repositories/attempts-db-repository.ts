import {attemptsCollection} from "../db/db";
import {Attempts} from "../types/types";

export const attemptsRepository = {
    async addAttempts(attempt : Attempts) {
        return attemptsCollection.insertOne(attempt)
    },
    async countOfAttempts(userIP: string, url: string, timeLimit: Date) {
        return attemptsCollection.countDocuments({userIP, url, time: {$gt: timeLimit}})
    }
}