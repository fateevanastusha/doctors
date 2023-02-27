export class Pagination {
    constructor(
                public pageNumber: number,
                public pageSize: number,
                public sortBy: string,
                public sortDirection: string) {
    }
}

export const getPagination = (query: any): Pagination => {
    //validation logic for fields
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc'
    }
}


export const paginator = (pageNumber: number, pageSize: number, totalCount: number, items: any) => {
    const pagesCount = Math.ceil(totalCount / pageSize)
    return {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount: totalCount,
        items
    }
}