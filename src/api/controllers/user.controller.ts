import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { UserService } from '../services/user.service';


export class UserController {
    public static async addUser(req: Request, res: Response) {
        try {
            const { user } = req.body;
            const response = await UserService.addUser(user);
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-addUser() | Error | ' + String(typedE.message))
            res.status(401).send({error: typedE});
        }
    }
    public static async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await UserService.getUser(id);
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
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-deleteUser() | Error | ' + String(typedE.message))
            res.status(401).send({error: typedE});
        }
    }
}