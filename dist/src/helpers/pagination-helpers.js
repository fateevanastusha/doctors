"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
exports.paginationHelpers = {
    //searchNameTerm
    //pageSize, default - 10
    pageSize(pageSize) {
        if (!pageSize) {
            return 10;
        }
        else {
            return +pageSize;
        }
    },
    //pageNumber, default - 1
    pageNumber(pageNumber) {
        if (!pageNumber) {
            return 1;
        }
        else {
            return +pageNumber;
        }
    },
    //sortBy, default - createdAt
    sortBy(sortBy) {
        if (!sortBy) {
            return "createdAt";
        }
        else {
            return sortBy;
        }
    },
    //sortDirection, default - descending
    sortDirection(sortDirection) {
        if (sortDirection === "asc") {
            return 1;
        }
        else {
            return -1;
        }
    },
    //searchNameTerm, no default
    searchNameTerm(name) {
        if (!name) {
            return "";
        }
        else {
            //count matches
            return name;
        }
    },
    searchLoginTerm(login) {
        if (!login) {
            return "";
        }
        else {
            //count matches
            return login;
        }
    },
    searchEmailTerm(email) {
        if (!email) {
            return "";
        }
        else {
            //count matches
            return email;
        }
    }
};
