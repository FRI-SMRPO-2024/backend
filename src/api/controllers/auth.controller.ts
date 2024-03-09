import logger from '../../utils/winston-logger';
import e, { Request, Response } from 'express'
import { AuthService } from '../services/auth.service';
import supabase from '../../utils/supabase';
import supabaseAdmin from '../../utils/supabase-admin';

export class AuthController {
    public static async login(req: Request, res: Response) {
        try {

            const email: string = req.body.email;
            const password: string = req.body.password;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
              });

            if (error) {
                throw new Error(error.message);
            }

            logger.log('info', 'api-AuthController-login() | SUCCESS')
            res.status(200).send(data)
            
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
            const email: string = req.body.email;
            const password: string = req.body.password;

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
              });

            if (error) {
                throw new Error(error.message);
            }

            logger.log('info', 'api-AuthController-signup() | SUCCESS')
            res.status(200).send(data)
            
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

            const password: string = req.body.password;

            const { data, error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) {
                throw new Error(error.message);
            }

            logger.log('info', 'api-AuthController-changePassword() | SUCCESS')
            res.status(200).send()

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

    public static async logout(req: Request, res: Response) {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
            logger.log('info', 'api-AuthController-logout() | SUCCESS')
            res.status(200).send()
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorMsg = String(e.message)
                logger.log('error', 'api-AuthController-logout() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            } else {   
                const errorMsg = String(e)
                logger.log('error', 'api-AuthController-logout() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            }
        }
    }

    public static async deleteUser(req: Request, res: Response) {
        try {
            const id: string = req.body.id;
            const { error } = await supabaseAdmin.auth.admin.deleteUser(id)
            if (error) {
                throw new Error(error.message);
            }
            logger.log('info', 'api-AuthController-deleteUser() | SUCCESS')
            res.status(200).send()
        } catch (e: unknown) {
            if (e instanceof Error) {
                const errorMsg = String(e.message)
                logger.log('error', 'api-AuthController-deleteUser() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            } else {   
                const errorMsg = String(e)
                logger.log('error', 'api-AuthController-deleteUser() | ERROR | ' + errorMsg)
                res.status(500).send({error: errorMsg})
            }
        }
    }
}