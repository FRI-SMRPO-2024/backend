import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { SprintService } from '../services/sprint.service';
import { SprintModel } from '../models/sprint.model';

export class SprintController {
    public static async getCurrentSprint(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.projectId);
            const response = await SprintService.getCurrentSprint(projectId);
            if (response) {
                logger.log('info', 'api-SprintController-getCurrentSprint() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-SprintController-getCurrentSprint() | SUCCESS | No active sprint')
                res.status(404).send({message: 'No active sprint'});
            }
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
            if (response) {
                logger.log('info', 'api-SprintController-getSprints() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-SprintController-getSprints() | SUCCESS | No sprints found')
                res.status(404).send({message: 'No sprints found'});
            }
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
            if (response) {
                logger.log('info', 'api-SprintController-getSprint() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-SprintController-getSprint() | SUCCESS | Sprint not found')
                res.status(404).send({message: 'Sprint not found'});
            }
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
            if (response) {
                logger.log('info', 'api-SprintController-createSprint() | SUCCESS')
                res.status(201).send(response);
            } else {
                logger.log('info', 'api-SprintController-createSprint() | SUCCESS | No sprints found')
                res.status(404).send({message: 'No sprints found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-createSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateSprint(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { velocity, start_date, end_date } = req.body;
            const response = await SprintService.updateSprint(id, velocity, start_date, end_date);
            if (response) {
                logger.log('info', 'api-SprintController-updateSprint() | SUCCESS')
                res.status(201).send(response);
            } else {
                logger.log('info', 'api-SprintController-updateSprint() | SUCCESS | No sprints found')
                res.status(404).send({message: 'No sprints found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-updateSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteSprint(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await SprintService.deleteSprint(id);
            if (response) {
                logger.log('info', 'api-SprintController-deleteSprint() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-SprintController-deleteSprint() | SUCCESS | No sprints found')
                res.status(404).send({message: 'No sprints found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-SprintController-deleteSprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}