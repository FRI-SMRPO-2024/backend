import { AuthService } from '../services/auth.service';
import logger from '../../utils/winston-logger';
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { supabase } from '../../supabase';
import { supabaseAdmin } from '../../supabase';
import { AuthResponse } from '@supabase/supabase-js';

export const jwtGuard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let auth: string = req.headers.authorization || '';
        if (auth) {
            const jwt = auth.split(' ')[1];
            const { data: user, error } = await supabase.auth.getUser(jwt);
            if (error) {
                logger.log('error', 'dashboardApi-jwtGuard() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error.message)
                    : res.status(500).send(error.message)
            } else {
                logger.log('info', 'dashboardApi-jwtGuard() | SUCCESS')
                req.body.user = user
                next()
                return req
            }
        } else {
            const errorMsg = 'Forbidden - no jwt'
            logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg) 
            return res.status(403).send({error: errorMsg})
        }
    } catch (e) {
        if (e instanceof Error) {
            const errorMsg = String(e.message)
            logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
            return res.status(500).send({error: errorMsg})
        } else {   
            const errorMsg = String(e)
            logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
            return res.status(500).send({error: errorMsg})
        }
    }
}