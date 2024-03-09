import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { UserService } from '../services/user.service';


export class UserController {
    public static async getUsers(req: Request, res: Response) {
        try {
            const response = await UserService.getUsers();
            logger.log('info', 'api-UserController-getUsers() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-getUsers() | Error | ' + String(typedE.message))
            res.status(401).send({error: typedE});
        }
    }
    public static async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await UserService.getUser(id);
            logger.log('info', 'api-UserController-getUser() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-getUser() | Error | ' + String(typedE.message))
            res.status(401).send({error: typedE});
        }
    }
    public static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { email } = req.body;
            const response = await UserService.updateUser(id, email);
            logger.log('info', 'api-UserController-updateUser() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-updateUser() | Error | ' + String(typedE.message))
            res.status(401).send({error: typedE});
        }
    }
    public static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await UserService.deleteUser(id);
            logger.log('info', 'api-UserController-deleteUser() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-deleteUser() | Error | ' + String(typedE.message))
            res.status(401).send({error: typedE});
        }
    }
}