import { AuthService } from '../services/auth.service';
import logger from '../../utils/winston-logger';
import type { Request, Response, NextFunction, RequestHandler } from "express";

// export const jwtGuard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         let token: string = <string>req.headers['authorization'] || '';
//         if (!token) {
//             const errorMsg = 'no authorization token'
//             logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
//             return res.status(500).send({error: errorMsg});
//         }
//         const acessToken = token.split(" ")[1] || '';
//         const verifiedDashboardUser: DashboardUser | null = await AuthService.verifyJwtAccessToken(acessToken);
//         if (verifiedDashboardUser) {
//             req.body.dashboardUser = verifiedDashboardUser;
//             next();
//             return req;
//         } else {
//             const errorMsg = 'verifyData is null'
//             logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
//             return res.status(500).send({error: errorMsg})
//         }
//     } catch (e) {
//         if (e instanceof Error) {
//             const errorMsg = String(e.message)
//             logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
//             return res.status(500).send({error: errorMsg})
//         } else {   
//             const errorMsg = String(e)
//             logger.log('error', 'dashboardApi-jwtGuard | Error | ' + errorMsg)
//             return res.status(500).send({error: errorMsg})
//         }
//     }
// }