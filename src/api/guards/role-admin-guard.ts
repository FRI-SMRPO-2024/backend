import { Request, Response, NextFunction, RequestHandler } from "express";
import logger from "../../utils/winston-logger";

export const roleAdminGuard: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dashboardUser = req.body.dashboardUser;
        if (dashboardUser.role_id === 1) { // TODO: Check by role name?
            next();
            return req;
        } else {
            const errorMsg = 'Forbidden - role is not admin'
            logger.log('error', 'dashboardApi-roleAdminGuard | Error | ' + errorMsg) 
            return res.status(403).send({error: errorMsg})
        }
    } catch (e) {
        if (e instanceof Error) {
            const errorMsg = String(e.message)
            logger.log('error', 'dashboardApi-roleAdminGuard | Error | ' + errorMsg)
            return res.status(401).send({error: errorMsg})
        } else {   
            const errorMsg = String(e)
            logger.log('error', 'dashboardApi-roleAdminGuard | Error | ' + errorMsg)
            return res.status(401).send({error: errorMsg})
        }
    }
}