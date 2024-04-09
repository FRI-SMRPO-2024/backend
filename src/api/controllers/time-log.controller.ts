import logger from '../../utils/winston-logger';
import e, { Request, Response } from 'express'
import { supabase } from '../../supabase';
import { supabaseAdmin } from '../../supabase';
import { TimeLogModel } from '../models/time-log.model';
import { TimeLogService } from '../services/time-log.service';
import { StoryService } from '../services/story.service';
import { TaskService } from '../services/task.service';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';

export class TimeLogController {
    public static async getTimeLogs(req: Request, res: Response): Promise<void> {
        try {
            const response: TimeLogModel[] | null = await TimeLogService.getTimeLogs();
            if (response) {
                logger.log('info', 'api-TimeLogController-getTimeLogs() | SUCCESS')
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'Time logs not found' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-getTimeLogs() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTimeLogsByStory(req: Request, res: Response): Promise<void> {
        try {
            const storyId = parseInt(req.params.id);
            const story = await StoryService.getStoryById(storyId);
            if (!story) {
                logger.log('error', 'api-TaskController-getTasksByStory() | Error | Story not found')
                res.status(404).send({error: 'Story not found'});
                return;
            }
            const response: TimeLogModel[] | null = await TimeLogService.getTimeLogsByStory(storyId);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-getTimeLogsByStory() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-getTimeLogsByStory() | SUCCESS | Time logs not found')
                res.status(404).json({ error: 'Time logs not found' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-getTimeLogsByStory() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTimeLogsByTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = parseInt(req.params.id);
            const task = await TaskService.getTaskById(taskId);
            if (!task) {
                logger.log('error', 'api-TimeLogController-getTimeLogsByTask() | Error | Task not found')
                res.status(404).send({error: 'Task not found'});
                return;
            }
            const response: TimeLogModel[] | null = await TimeLogService.getTimeLogsByTask(taskId);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-getTimeLogsByTask() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-getTimeLogsByTask() | SUCCESS | Time logs not found')
                res.status(404).json({ error: 'Time logs not found' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-getTimeLogsByTask() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTimeLogsByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await UserService.getUserById(userId)
            if (!user) {
                logger.log('error', 'api-TimeLogController-getTimeLogsByUser() | Error | User not found')
                res.status(404).send({error: 'User not found'});
                return;
            }
            const response: TimeLogModel[] | null = await TimeLogService.getTimeLogsByUser(userId);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-getTimeLogsByUser() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-getTimeLogsByUser() | SUCCESS | Time logs not found')
                res.status(404).json({ error: 'Time logs not found' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-getTimeLogsByUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTimeLogById(req: Request, res: Response): Promise<void> {
        try {
            const timeLogId = parseInt(req.params.id);
            const response: TimeLogModel | null = await TimeLogService.getTimeLogById(timeLogId);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-getTimeLogById() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-getTimeLogById() | SUCCESS')
                res.status(404).json({ error: 'Time log not found' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-getTimeLogById() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createTimeLog(req: Request, res: Response): Promise<void> {
        try {
            const timeLog: TimeLogModel = req.body;
            const response: TimeLogModel | null = await TimeLogService.createTimeLog(timeLog);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-createTimeLog() | SUCCESS')
                res.status(201).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-createTimeLog() | Error | Error creating time log')
                res.status(500).json({ error: 'Error creating time log' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-createTimeLog() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateTimeLog(req: Request, res: Response): Promise<void> {
        try {
            const timeLog: TimeLogModel = req.body;
            const response: TimeLogModel | null = await TimeLogService.updateTimeLog(timeLog);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-updateTimeLog() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-updateTimeLog() | Error | Error updating time log')
                res.status(500).json({ error: 'Error updating time log' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-updateTimeLog() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteTimeLog(req: Request, res: Response): Promise<void> {
        try {
            const timeLogId = parseInt(req.params.id);
            const response: TimeLogModel | null = await TimeLogService.deleteTimeLog(timeLogId);
            if (response !== null) {
                logger.log('info', 'api-TimeLogController-deleteTimeLog() | SUCCESS')
                res.status(200).json(response);
            } else {
                logger.log('error', 'api-TimeLogController-deleteTimeLog() | Error | Error deleting time log')
                res.status(500).json({ error: 'Error deleting time log' });
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TimeLogController-deleteTimeLog() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}