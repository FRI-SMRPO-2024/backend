import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { DocumentationService } from '../services/documentation.service';
import { DocumentationModel } from '../models/documentation.model';
import { ProjectService } from '../services/project.service';

export class DocumentationController {
    public static async getDocumentationByProject(req: Request, res: Response): Promise<void> {
        try {
            const projectId = parseInt(req.params.project_id);
            const validProject = await ProjectService.getProjectById(projectId);
            if (!validProject) {
                res.status(404).send({error: 'Project not found'});
                return;
            }
            const response: DocumentationModel[] | null = await DocumentationService.getDocumentationByProject(projectId);
            if (response !== null) {
                logger.log('info', 'api-DocumentationController-getDocumentationByProject() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-DocumentationController-getDocumentationByProject() | Error | Error getting documentation')
                res.status(404).json({ error: `Documentation for project ${projectId} not found.` });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-DocumentationController-getDocumentationByProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getDocumentationById(req: Request, res: Response): Promise<void> {
        try {
            const documentationId = parseInt(req.params.id);
            const response: DocumentationModel | null = await DocumentationService.getDocumentationById(documentationId);
            if (response !== null) {
                logger.log('info', 'api-DocumentationController-getDocumentationById() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-DocumentationController-getDocumentationById() | Error | Error getting documentation')
                res.status(404).json({ error: `Documentation ${documentationId} not found.` });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-DocumentationController-getDocumentationById() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createDocumentation(req: Request, res: Response): Promise<void> {
        try {
            const { project_id, text, date }: DocumentationModel = req.body;
            const validProject = await ProjectService.getProjectById(project_id);
            if (!validProject) {
                res.status(404).send({error: 'Project not found'});
                return;
            }
            const documentationForProject = await DocumentationService.getDocumentationByProject(project_id)
            if (documentationForProject !== null && documentationForProject.length > 0) {
                res.status(409).send({error: `Documentation for project ${project_id} already exists.`});
                return;
            }
            const response: DocumentationModel | null = await DocumentationService.createDocumentation(project_id, text, date);
            if (response !== null) {
                logger.log('info', 'api-DocumentationController-createDocumentation() | SUCCESS')
                res.status(201).json(response);
            } else {
                logger.log('error', 'api-DocumentationController-createDocumentation() | Error | Error creating documentation')
                res.status(500).json({ error: 'Error creating documentation' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-DocumentationController-createDocumentation() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateDocumentation(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { project_id, text, date }: DocumentationModel = req.body;
            const validProject = await ProjectService.getProjectById(project_id);
            if (!validProject) {
                res.status(404).send({error: 'Project not found'});
                return;
            }
            const response: DocumentationModel | null = await DocumentationService.updateDocumentation(id, project_id, text, date);
            if (response !== null) {
                logger.log('info', 'api-DocumentationController-updateDocumentation() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-DocumentationController-updateDocumentation() | Error | Error updating documentation')
                res.status(500).json({ error: 'Error updating documentation' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-DocumentationController-updateDocumentation() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteDocumentation(req: Request, res: Response): Promise<void> {
        try {
            const documentationId = parseInt(req.params.id);
            const response: DocumentationModel | null = await DocumentationService.deleteDocumentation(documentationId);
            if (response !== null) {
                logger.log('info', 'api-DocumentationController-deleteDocumentation() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-DocumentationController-deleteDocumentation() | Error | Error deleting documentation')
                res.status(500).json({ error: 'Error deleting documentation' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-DocumentationController-deleteDocumentation() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}