import {transport} from "../node-mailer/nodemailer-utils";

export const businessService = {
    async sendConfirmationCode (email : string, confirmationCode : string) : Promise<string> {
        await transport.sendMail({
            from: "Blogs And Videos API", // sender address
            to: email, // list of receivers
            subject: "CONFIRMATION CODE", // Subject line
            html: `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
      </p>`
        });
        return confirmationCode
    }
}