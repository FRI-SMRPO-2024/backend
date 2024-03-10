import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/project.model';
import { UserService } from '../services/user.service';

export class ProjectController {
    public static async getProjects(req: Request, res: Response) {
        try {
            const response = await ProjectService.getProjects();
            logger.log('info', 'api-ProjectController-getProjects() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-getProjects() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await ProjectService.getProjectById(id);
            logger.log('info', 'api-ProjectController-getProject() | SUCCESS')
            res.status(200).send(response);
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-getProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createProject(req: Request, res: Response) {
        try {
            const { name, description, owner_id } = req.body;
            const owner = await UserService.getUserById(owner_id);
            if (owner && owner.id === owner_id) {
                const response = await ProjectService.createProject(name, description, owner_id);
                logger.log('info', 'api-ProjectController-createProject() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'User by owner_id not found'});
                return;
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-createProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, documentation } = req.body;
            const project = await ProjectService.getProjectById(id);
            if (project) {
                const response = await ProjectService.updateProject(id, name, description, documentation);
                logger.log('info', 'api-ProjectController-updateProject() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'Project not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-updateProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const project = await ProjectService.getProjectById(id);
            if (project) {
                const response = await ProjectService.deleteProject(id);
                logger.log('info', 'api-ProjectController-deleteProject() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'Project not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-deleteProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}