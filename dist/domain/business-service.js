"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessService = void 0;
const nodemailer_utils_1 = require("../node-mailer/nodemailer-utils");
exports.businessService = {
    sendConfirmationCode(email, confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nodemailer_utils_1.transport.sendMail({
                from: "Blogs And Videos API",
                to: email,
                subject: "CONFIRMATION CODE",
                html: `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>
      </p>`
            });
            return confirmationCode;
        });
    }
};
