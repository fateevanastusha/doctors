import {Like} from "../types/types";

export class LikesHelpers {
    async requestType (status : Like | null) : Promise<string>{
        if (!status){
            return "None"
        } else if (status.status === "Like"){
            return "Like"
        } else {
            return "Dislike"
        }
    }
}