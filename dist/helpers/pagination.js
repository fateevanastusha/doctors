"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = exports.getPagination = exports.Pagination = void 0;
class Pagination {
    constructor(pageNumber, pageSize, sortBy, sortDirection) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
    }
}
exports.Pagination = Pagination;
const getPagination = (query) => {
    //validation logic for fields
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc'
    };
};
exports.getPagination = getPagination;
const paginator = (pageNumber, pageSize, totalCount, items) => {
    const pagesCount = Math.ceil(totalCount / pageSize);
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount: totalCount,
        items
    };
};
exports.paginator = paginator;
