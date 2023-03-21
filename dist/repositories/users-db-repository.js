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
exports.usersRepository = void 0;
const db_1 = require("../db/db");
exports.usersRepository = {
    //RETURN ALL USERS
    returnAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.usersCollection
                .find({ projection: { _id: 0, password: 0, isConfirmed: 0, confirmedCode: 0 } })
                .toArray();
        });
    },
    //COUNT USERS WITH SEARCH LOGIN TERM AND SEARCH EMAIL TERM
    returnUsersCount(searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.usersCollection.countDocuments({
                $or: [
                    { login: { $regex: searchLoginTerm, $options: 'i' } },
                    { email: { $regex: searchEmailTerm, $options: 'i' } }
                ]
            });
        });
    },
    //GET USER BY ID
    returnUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.usersCollection
                .findOne({ id: id }, { projection: { _id: 0, password: 0, isConfirmed: 0, confirmedCode: 0 } });
        });
    },
    //GET USER BY FIELD
    returnUserByField(field) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersCollection
                .findOne({ $or: [{ login: field }, { email: field }] });
            return user;
        });
    },
    //GET USER BY LOGIN
    returnUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = db_1.usersCollection
                .findOne({ login: login }, { projection: { _id: 0 } });
            return user;
        });
    },
    //GET USER BY EMAIL OR LOGIN
    returnUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = db_1.usersCollection
                .findOne({ email: email }, { projection: { _id: 0 } });
            return user;
        });
    },
    //CREATE NEW USER
    createNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersCollection.insertOne(newUser);
            const updatedUser = yield this.returnUserById(newUser.id);
            if (updatedUser) {
                return updatedUser;
            }
            return null;
        });
    },
    //DELETE USER BY ID
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.usersCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //CHECK FOR CONFIRMATION CODE
    checkForConfirmationCode(confirmedCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersCollection.findOne({ confirmedCode: confirmedCode });
            return user !== null;
        });
    },
    //CHANGE CONFIRMATION STATUS
    changeConfirmedStatus(confirmedCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield db_1.usersCollection.updateOne({ confirmedCode: confirmedCode }, { $set: {
                    isConfirmed: true
                }
            });
            return status.matchedCount === 1;
        });
    },
    //CHANGE CONFIRMATION CODE
    changeConfirmationCode(confirmationCode, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield db_1.usersCollection.updateOne({ email: email }, { $set: {
                    confirmedCode: confirmationCode
                }
            });
            return status.matchedCount === 1;
        });
    },
    //CHECK FOR CONFIRMED ACCOUNT
    checkForConfirmedAccountByEmailOrCode(emailOrCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersCollection.findOne({ $or: [{ email: emailOrCode }, { confirmedCode: emailOrCode }] });
            if (user === null || user === void 0 ? void 0 : user.isConfirmed) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    //DELETE ALL DATA
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersCollection.deleteMany({});
            return [];
        });
    }
};
