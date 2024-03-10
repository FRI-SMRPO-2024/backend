import logger from '../../utils/winston-logger';
import e, { Request, Response } from 'express'
import { AuthService } from '../services/auth.service';
import { supabase } from '../../utils/supabase';
import { supabaseAdmin } from '../../utils/supabase';
import { AuthResponse } from '@supabase/supabase-js';
import { UserLoginResponse, UserSignupResponse } from '../models/auth.model';
import { UserService } from '../services/user.service';

export class AuthController {
    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
              });

            if (error) {
                logger.log('error', 'api-AuthController-login() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error.message)
                    : res.status(500).send(error.message)
            } else {
                const userLoginResponse: UserLoginResponse = {
                    email: data?.user?.email || null,
                    access_token: data?.session?.access_token || null,
                    refresh_token: data?.session?.refresh_token || null,
                }

                logger.log('info', 'api-AuthController-login() | SUCCESS')
                res.status(200).send(userLoginResponse)   
            }
  
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
            const { email, password } = req.body;

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
              });

            if (error) {
                logger.log('error', 'api-AuthController-signup() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error.message)
                    : res.status(500).send(error.message)
            } else {
                const userSignupResponse: UserSignupResponse = {
                    email: data?.user?.email || null,
                    access_token: data?.session?.access_token || null,
                    refresh_token: data?.session?.refresh_token || null,
                }
    
                logger.log('info', 'api-AuthController-signup() | SUCCESS')
                res.status(200).send(userSignupResponse)
            }

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
            const { id } = req.params;
            const { password, confirmPassword } = req.body;

            // Log the id
            logger.log('info', 'api-AuthController-changePassword() | id: ' + id)

            const user = await UserService.getUser(id);

            // Log the user
            logger.log('info', 'api-AuthController-changePassword() | user: ' + JSON.stringify(user))

            if (user) {
                // Invoke an edge function called reset-password
                const { data, error } = await supabase.functions.invoke('reset-password', {
                    body: JSON.stringify({
                        userId: id,
                        password: password,
                        confirmPassword: confirmPassword
                    })
                });           

                if (error) {
                    logger.log('error', 'api-AuthController-changePassword() | ERROR | ' + error.message)
                    error.status 
                        ? res.status(error.status).send(error.message)
                        : res.status(500).send(error.message)
                } else {
                    logger.log('info', 'api-AuthController-changePassword() | SUCCESS')
                    res.status(200).send()
                }
            } else {
                res.status(404).send({error: 'User not found'});
            }

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
            const { access_token } = req.body;
            const { error } = await supabase.auth.signOut(access_token);
            if (error) {
                logger.log('error', 'api-AuthController-logout() | ERROR | ' + error.message)
                error.status 
                    ? res.status(error.status).send(error.message)
                    : res.status(500).send(error.message)
            } else {
                logger.log('info', 'api-AuthController-logout() | SUCCESS')
                res.status(200).send()
            }

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
}