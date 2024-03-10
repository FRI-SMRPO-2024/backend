import { Request, Response, NextFunction, RequestHandler } from "express";
import logger from "../../utils/winston-logger";
import { supabase } from '../../supabase';
import { supabaseAdmin } from '../../supabase';
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";


export const roleAdminGuard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let auth: string = req.headers.authorization || '';
        if (auth) {
            const jwt = auth.split(' ')[1];
            const { data: user, error } = await supabase.auth.getUser(jwt);
            if (error) {
                logger.log('error', 'api-roleAdminGuard() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error.message)
                    : res.status(500).send(error.message)
            } else if (user?.user.email) {
                const authUser = await UserService.getUserByEmail(user?.user.email)
                if (authUser?.is_admin === true) {
                    logger.log('info', 'api-roleAdminGuard() | SUCCESS')
                    req.body.user = user
                    next()
                    return req
                } else {
                    const errorMsg = 'Forbidden - no admin role'
                    logger.log('error', 'api-roleAdminGuard | Error | ' + errorMsg) 
                    return res.status(403).send({error: errorMsg})
                }
            } else throw new Error('User not found')
        } else {
            const errorMsg = 'Forbidden - no jwt'
            logger.log('error', 'api-roleAdminGuard | Error | ' + errorMsg) 
            return res.status(403).send({error: errorMsg})
        }

    } catch (e) {
        if (e instanceof Error) {
            const errorMsg = String(e.message)
            logger.log('error', 'api-roleAdminGuard | Error | ' + errorMsg)
            return res.status(500).send({error: errorMsg})
        } else {   
            const errorMsg = String(e)
            logger.log('error', 'api-roleAdminGuard | Error | ' + errorMsg)
            return res.status(500).send({error: errorMsg})
        }
    }
}