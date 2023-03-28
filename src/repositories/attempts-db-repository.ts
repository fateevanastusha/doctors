import {Attempts} from "../types/types";
import {AttemptsModel} from "../types/models";

export const attemptsRepository = {
    async addAttempts(attempt : Attempts) {
        return AttemptsModel.insertMany(attempt)
    },
    async countOfAttempts(userIP: string, url: string, timeLimit: Date) {
        return AttemptsModel.countDocuments({userIP, url, time: {$gt: timeLimit}})
    }
}