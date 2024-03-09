import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service';

export class AuthController {
    public static async login(req: Request, res: Response) {
        try {
            // const user = await dashboardUserService.findOneBy({ email: req.body.email, password: createMd5Hash(req.body.password) });
            // if (user) {

            // } else {
            //     const errorMsg = 'wrong username or password'
            //     logger.log('error', 'api-AuthController-login() | ERROR | ' + errorMsg)
            //     res.status(403).send({error: errorMsg})
            // }
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorMsg = String(e.message)
                logger.log('error', 'api-AuthController-login() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            } else {   
                const errorMsg = String(e)
                logger.log('error', 'api-AuthController-login() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            }
        }
    }
    public static async signup(req: Request, res: Response) {
        try {
            // const oldRefreshToken: string = req.body.refreshToken;
            // const newTokensRes;
            // if (newTokensRes) {
            //     logger.log('info', 'api-AuthController-signup() | SUCCESS')
            //     res.status(200).send(newTokensRes) 
            // } else {
            //     const errorMsg: string = 'signup() returned null'
            //     logger.log('error', 'api-AuthController-signup() | ERROR | ' + errorMsg)
            // }
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorMsg = String(e.message)
                logger.log('error', 'api-AuthController-signup() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            } else {   
                const errorMsg = String(e)
                logger.log('error', 'api-AuthController-signup() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            }
        }
    }
    public static async changePassword(req: Request, res: Response) {
        try {
            // const user = await dashboardUserService.findOneBy({ email: req.body.email, password: createMd5Hash(req.body.oldPassword) });
            // if (user) {
            //     const updatePasswordUser = await dashboardUserService.updatePassword(user.id, createMd5Hash(req.body.newPassword));
            //     if (updatePasswordUser.id === user.id) {
            //         logger.log('info', 'api-AuthController-changePassword() | SUCCESS')
            //         res.status(200).send()
            //     } else {
            //         const errorMsg = 'password update unsuccessful'
            //         logger.log('error', 'api-AuthController-changePassword() | ERROR | ' + errorMsg)
            //         res.status(500).send({error: errorMsg})
            //     }
            // } else {
            //     const errorMsg = 'wrong username or password'
            //     logger.log('error', 'api-AuthController-changePassword() | ERROR | ' + errorMsg)
            //     res.status(403).send({error: errorMsg})
            // }
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorMsg = String(e.message)
                logger.log('error', 'api-AuthController-changePassword() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            } else {   
                const errorMsg = String(e)
                logger.log('error', 'api-AuthController-changePassword() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            }
        }
    }
}