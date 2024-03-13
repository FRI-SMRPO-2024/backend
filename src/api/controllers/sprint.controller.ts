import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { SprintService } from '../services/sprint.service';
import { SprintModel } from '../models/sprint.model';

export class SprintController {
    public static async getCurrentSprint(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.projectId);
            const response = await SprintService.getCurrentSprint(projectId);
            logger.log('info', 'api-SprintController-getCurrentSprint() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-getCurrentSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getSprints(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.projectId);
            const response = await SprintService.getSprints(projectId);
            logger.log('info', 'api-SprintController-getSprints() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-getSprints() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getSprint(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await SprintService.getSprintById(id);
            logger.log('info', 'api-SprintController-getSprint() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-getSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createSprint(req: Request, res: Response) {
        try {
            const { velocity, project_id, start_date, end_date } = req.body;
            const response = await SprintService.createSprint(velocity, project_id, start_date, end_date);
            logger.log('info', 'api-SprintController-createSprint() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-createSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateSprint(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            // First get sprint by id
            const sprint = await SprintService.getSprintById(id);
            if (!sprint) {
                logger.log('error', 'api-SprintController-updateSprint() | Error | Sprint not found')
                res.status(404).send({error: 'Sprint not found'});
            }

            const { velocity, start_date, end_date } = req.body;
            const response = await SprintService.updateSprint(id, velocity, start_date, end_date);
            logger.log('info', 'api-SprintController-updateSprint() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-updateSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteSprint(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            // First get sprint by id
            const sprint = await SprintService.getSprintById(id);
            if (!sprint) {
                logger.log('error', 'api-SprintController-deleteSprint() | Error | Sprint not found')
                res.status(404).send({error: 'Sprint not found'});
            }

            const response = await SprintService.deleteSprint(id);
            logger.log('info', 'api-SprintController-deleteSprint() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-deleteSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}