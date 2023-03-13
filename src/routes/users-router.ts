import {
    Request,
    Response,
    Router} from "express";
import {usersService} from "../domain/users-service";
import {User} from "../types/types";
import {
    emailCheck,
    loginCheck,
    passwordCheck,
    inputValidationMiddleware, createAccountValidationMiddleware
} from "../middlewares/input-valudation-middleware";
import {adminAuth} from "./blogs-router";
import {paginationHelpers} from "../helpers/pagination-helpers";
import {SortDirection} from "mongodb";

export const usersRouter = Router()



//GET ALL USERS WITH AUTH

usersRouter.get('/', adminAuth, async (req: Request, res: Response) =>{
    let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize)
    let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber)
    let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy)
    let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection)
    let searchLoginTerm : string = paginationHelpers.searchLoginTerm(<string>req.query.searchLoginTerm)
    let searchEmailTerm : string = paginationHelpers.searchEmailTerm(<string>req.query.searchEmailTerm)
    const allUsers = await usersService.getAllUsers(pageSize, pageNumber, sortBy, sortDirection,searchLoginTerm, searchEmailTerm);
    res.status(200).send(allUsers)
});

//POST USER WITH AUTH

usersRouter.post('/',
    loginCheck,
    passwordCheck,
    emailCheck,
    createAccountValidationMiddleware,
    async (req: Request, res: Response) =>{

    const newUser : User | null = await usersService.createNewUser(req.body);
    if (!newUser) {
        res.sendStatus(404)
    } else {
        res.status(201).send(newUser)
    }

});

//DELETE USER BY ID WITH AUTH

usersRouter.delete('/:id', adminAuth, async (req: Request, res: Response) =>{

    const status : boolean = await usersService.deleteUserById(req.params.id)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

});
