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
    //return ALL USERS
    returnAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.usersCollection
                .find({ projection: { _id: 0, password: 0 } })
                .toArray();
        });
    },
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
    //return USER BY ID
    returnUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.usersCollection
                .findOne({ id: id }, { projection: { _id: 0, password: 0 } });
        });
    },
    //return USER BY FIELD
    returnUserByField(field) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.usersCollection
                .findOne({ $or: [{ login: field }, { email: field }] });
            return user;
        });
    },
    //get USER BY LOGIN
    returnUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = db_1.usersCollection
                .findOne({ login: login }, { projection: { _id: 0 } });
            return user;
        });
    },
    //get USER BY EMAIL OR LOGIN
    returnUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = db_1.usersCollection
                .findOne({ email: email }, { projection: { _id: 0 } });
            return user;
        });
    },
    //create NEW USER
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
    //delete USER BY ID
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.usersCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    //delete ALL DATA
    deleteAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.usersCollection.deleteMany({});
            return [];
        });
    }
};
