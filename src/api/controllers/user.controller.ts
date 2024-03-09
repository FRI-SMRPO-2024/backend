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
            res.status(500).send({error: typedE.message});
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
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { username, first_name, last_name } = req.body;
            const user = await UserService.getUser(id);
            if (user) {
                const response = await UserService.updateUser(id, username, first_name, last_name);
                logger.log('info', 'api-UserController-updateUser() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-updateUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await UserService.deleteUser(id)
            logger.log('info', 'api-UserController-deleteUser() | SUCCESS')
            res.status(200).send(response)
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorMsg = String(e.message)
                logger.log('error', 'api-UserController-deleteUser() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            } else {   
                const errorMsg = String(e)
                logger.log('error', 'api-UserController-deleteUser() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            }
        }
    }
    public static async updateLastLogin(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUser(id);
            if (user) {
                const response = await UserService.updateLastLogin(id);
                logger.log('info', 'api-UserController-updateLastLogin() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-updateLastLogin() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async setRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { is_admin } = req.body;
            const user = await UserService.getUser(id);
            if (user) {
                const response = await UserService.setRole(id, is_admin);
                logger.log('info', 'api-UserController-setRole() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-setRole() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}