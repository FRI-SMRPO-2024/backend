import express from 'express';
import { TimeLogController } from '../controllers/time-log.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Time Log
 *   description: Time Log management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TimeLog:
 *       type: object
 *       required:
 *         - id
 *         - task_id
 *         - user_id
 *         - date
 *         - time_from
 *         - time_to
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the TimeLog
 *         task_id:
 *           type: integer
 *           description: ID of the task associated with this time log
 *         user_id:
 *           type: string
 *           description: ID of the user who created this time log
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the time log
 *         time_from:
 *           type: string
 *           format: date-time
 *           description: Start time of the log
 *         time_to:
 *           type: string
 *           format: date-time
 *           description: End time of the log
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the log was created
 */


/**
 * @swagger
 * /get-all:
 *   get:
 *     summary: Retrieve a list of all time logs
 *     tags: [Time Log]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: A list of time logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeLog'
 *       404:
 *         description: Time logs not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-all', jwtGuard, TimeLogController.getTimeLogs);

/**
 * @swagger
 * /get-by-story/{story_id}:
 *   get:
 *     summary: Retrieve time logs by story ID
 *     tags: [Time Log]
 *     parameters:
 *       - in: path
 *         name: story_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the story
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: An array of time logs associated with the story ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeLog'
 *       404:
 *         description: Story not found or time logs for the story not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-story/:story_id', jwtGuard, TimeLogController.getTimeLogsByStory);

/**
 * @swagger
 * /get-by-task/{task_id}:
 *   get:
 *     summary: Retrieve time logs by task ID
 *     tags: [Time Log]
 *     parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the task
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: An array of time logs associated with the task ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeLog'
 *       404:
 *         description: Task not found or time logs for the task not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-task/:task_id', jwtGuard, TimeLogController.getTimeLogsByTask);


/**
 * @swagger
 * /get-by-user/{user_id}:
 *   get:
 *     summary: Retrieve time logs by user ID
 *     tags: [Time Log]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the user
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: An array of time logs associated with the user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeLog'
 *       404:
 *         description: User not found or time logs for the user not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-user/:user_id', jwtGuard, TimeLogController.getTimeLogsByUser);


/**
 * @swagger
 * /get-by-id/{id}:
 *   get:
 *     summary: Retrieve a single time log by ID
 *     tags: [Time Log]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the time log
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: A single time log
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeLog'
 *       404:
 *         description: Time log not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-id/:id', jwtGuard, TimeLogController.getTimeLogById);


/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new time log
 *     tags: [Time Log]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeLog'
 *     security:
 *       - jwt: []
 *     responses:
 *       201:
 *         description: Time log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeLog'
 *       500:
 *         description: Error creating time log
 */
router.post('/create', jwtGuard, TimeLogController.createTimeLog);


/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update an existing time log
 *     tags: [Time Log]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the time log to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeLog'
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Time log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeLog'
 *       500:
 *         description: Error updating time log
 */
router.put('/update/:id', jwtGuard, TimeLogController.updateTimeLog);


/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a time log
 *     tags: [Time Log]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the time log to be deleted
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Time log deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeLog'
 *       500:
 *         description: Error deleting time log
 */
router.delete('/delete/:id', jwtGuard, TimeLogController.deleteTimeLog);




export default router;
