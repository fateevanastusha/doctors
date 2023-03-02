//POST auth/login - 204 correct login and password 400 incorrect values + add tokens (login/email) + гтдщпшт

//GET /users
//POST /users
//DELETE /users/id

/*
USER:

id ( not in view model)
username
login
email
password ( not in view model)

 */

//Аользователи из сестемы не должны удаляться навсегда, они должны соханяться в базе данных
//Pagination
//Уникальность на login и email


import {
    Request,
    Response,
    Router} from "express";
import {usersService} from "../domain/users-service";
import {usersRepository} from "../repositories/users-db-repository";
import {User} from "../types/types";
import {
    emailCheck,
    loginCheck,
    passwordCheck,
    inputValidationMiddleware } from "../middlewares/input-valudation-middleware";
import {adminAuth} from "./blogs-router";

export const usersRouter = Router()

//GET ALL USERS WITH AUTH

usersRouter.get('/', adminAuth, async (req: Request, res: Response) =>{
    const allUsers = await usersService.getAllUsers();
    res.status(200).send(allUsers)
});

//POST USER WITH AUTH

usersRouter.post('/',
    adminAuth,
    loginCheck,
    passwordCheck,
    emailCheck,
    inputValidationMiddleware,
    async (req: Request, res: Response) =>{

    const newUser : User | null = await usersRepository.createNewUser(req.body);
    if (!newUser) {
        res.sendStatus(404)
    } else {
        res.status(200).send(newUser)
    }

});

//DELETE USER BY ID WITH AUTH

usersRouter.delete('/:id', adminAuth, async (req: Request, res: Response) =>{

    const status : boolean = await usersRepository.deleteUserById(req.params.id)
    if (status) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

});
