import request from "supertest";
import {app} from "../app";
import {blogsURI,blogNameString, blogDescriptionString, blogWebsiteUrlString} from "./test-string";
// Create new blog
export const blogCreator = async (
    uri: string = blogsURI,
    name: string = blogNameString,
    description: string = blogDescriptionString,
    websiteUrl: string = blogWebsiteUrlString,
    authValue: string = "Basic YWRtaW46cXdlcnR5"
) => {
    return request(app)
        .post(uri)
        .send({
            uri,
            name,
            description,
            websiteUrl,
        })
        .set({Authorization : "Basic YWRtaW46cXdlcnR5"});
};