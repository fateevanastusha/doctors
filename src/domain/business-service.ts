import {transport} from "../node-mailer/nodemailer-utils";

export const businessService = {
    async sendConfirmationCode (email : string, confirmationCode : string) : Promise<string> {
        await transport.sendMail({
            from: "Blogs And Videos API", // sender address
            to: email, // list of receivers
            subject: "CONFIRMATION CODE", // Subject line
            html: confirmationCode // html body
        });
        return confirmationCode
    }
}