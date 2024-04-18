import logger from "../../utils/winston-logger";
import {Request, Response} from "express";
import {ProjectWallService} from "../services/project-wall.service";
import { TimeLogService } from '../services/time-log.service';
import { ProjectService } from '../services/project.service';
import { UserService } from "../services/user.service";
import { ProjectWallReturnModel } from "../models/project-wall.model";


export class ProjectWallController {
    public static async getProjectWall(req: Request, res: Response) {
        try {
            const projectId = parseInt(req.params.projectId);
            const projectWall = await ProjectWallService.getProjectWall(projectId);
            if (!projectWall) {
                logger.info(`Project wall not found for project id: ${projectId}`);
                res.status(404).json({ message: "Project wall not found" });
                return
            }
            const projectWallReturn: ProjectWallReturnModel[] = [];
            for (const wall of projectWall) {
                const user = await UserService.getUserById(wall.user_id);
                if (!user) {
                    logger.info(`User not found for user id: ${wall.user_id}`);
                    res.status(404).json({ message: "User not found" });
                    return
                }
                projectWallReturn.push({id: wall.id, project_id: wall.project_id, content: wall.content, created_at: wall.created_at, user: user});
            }
            res.status(200).json(projectWallReturn);
        } catch (error) {
            logger.error(`Error getting project wall: ${error}`);
            res.status(500).json({ message: "Error getting project wall" });
        }
    }
    public static async getProjectWallById(req: Request, res: Response) {
        try {
            const projectWallId = parseInt(req.params.projectWallId);
            const projectWall = await ProjectWallService.getProjectWallById(projectWallId);
            if (!projectWall) {
                logger.info(`Project wall not found for project wall id: ${projectWallId}`);
                res.status(404).json({ message: "Project wall not found" });
                return
            }
            const user = await UserService.getUserById(projectWall.user_id);
            if (!user) {
                logger.info(`User not found for user id: ${projectWall.user_id}`);
                res.status(404).json({ message: "User not found" });
                return
            }
            const projectWallReturn = {id: projectWall.id, project_id: projectWall.project_id, content: projectWall.content, created_at: projectWall.created_at, user: user}
            res.status(200).json(projectWallReturn);        
        } catch (error) {
            logger.error(`Error getting project wall: ${error}`);
            res.status(500).json({ message: "Error getting project wall" });
        }
    }
    public static async addToProjectWall(req: Request, res: Response) {
        try {
            const {project_id, user_id, content} = req.body;
            const validProject = await ProjectService.getProjectById(project_id);
            if (!validProject) {
                logger.info(`Project not found for project id: ${project_id}`);
                res.status(404).json({ message: "Project not found" });
                return
            }
            const projectWall = await ProjectWallService.addToProjectWall(project_id, user_id, content);
            if (!projectWall) {
                logger.info(`Project wall not added for project id: ${project_id}`);
                res.status(404).json({ message: "Project wall not added" });
                return
            }
            res.status(200).json(projectWall);
        } catch (error) {
            logger.error(`Error adding project wall: ${error}`);
            res.status(500).json({ message: "Error adding project wall" });
        }
    }
    public static async deleteFromProjectWall(req: Request, res: Response) {
        try {
            const projectWallId = parseInt(req.params.projectWallId);

            const validProjectWall = await ProjectWallService.getProjectWallById(projectWallId);
            if (!validProjectWall) {
                logger.info(`Project wall not found for project wall id: ${projectWallId}`);
                res.status(404).json({ message: "Project wall not found" });
                return
            }
            
            const projectWall = await ProjectWallService.deleteFromProjectWall(projectWallId);
            if (!projectWall) {
                logger.info(`Project wall not deleted for project wall id: ${projectWallId}`);
                res.status(404).json({ message: "Project wall not deleted" });
                return
            }
            res.status(200).json(projectWall);
        } catch (error) {
            logger.error(`Error deleting project wall: ${error}`);
            res.status(500).json({ message: "Error deleting project wall" });
        }
    }
    public static async updateProjectWall(req: Request, res: Response) {
        try {
            const projectWallId = parseInt(req.params.projectWallId);
            const content = req.body.content;

            const validProjectWall = await ProjectWallService.getProjectWallById(projectWallId);
            if (!validProjectWall) {
                logger.info(`Project wall not found for project wall id: ${projectWallId}`);
                res.status(404).json({ message: "Project wall not found" });
                return
            }

            const projectWall = await ProjectWallService.updateProjectWall(projectWallId, content);
            if (!projectWall) {
                logger.info(`Project wall not updated for project wall id: ${projectWallId}`);
                res.status(404).json({ message: "Project wall not updated" });
                return
            }
            res.status(200).json(projectWall);
        } catch (error) {
            logger.error(`Error updating project wall: ${error}`);
            res.status(500).json({ message: "Error updating project wall" });
        }
    }
}