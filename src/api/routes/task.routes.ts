import express from 'express';
import { TaskController } from '../controllers/task.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskStatus:
 *       type: string
 *       enum:
 *         - NULL
 *         - ACCEPTED
 *         - COMPLETED
 *         - CREATED
 *         - PENDING
 *       description: The current status of the task
 * 
 *     TaskModel:
 *       type: object
 *       required:
 *         - id
 *         - story_id
 *         - assignee_id
 *         - status
 *         - description
 *         - time_estimation
 *         - time_needed
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the task
 *         story_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the story this task is associated with
 *         assignee_id:
 *           type: string
 *           description: Identifier of the user this task is assigned to
 *         status:
 *           $ref: '#/components/schemas/TaskStatus'
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *         time_estimation:
 *           type: number
 *           format: float
 *           description: Estimated time to complete the task in hours
 *         time_needed:
 *           type: number
 *           format: float
 *           description: Actual time needed to complete the task in hours
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the task was created
 * 
 *     TaskCreateModel:
 *       type: object
 *       required:
 *         - story_id
 *         - assignee_id
 *         - description
 *         - time_estimation
 *       properties:
 *         story_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the story this task is associated with
 *         assignee_id:
 *           type: string
 *           description: Identifier of the user this task is assigned to
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *         time_estimation:
 *           type: number
 *           format: float
 *           description: Estimated time to complete the task in hours
 * 
 *     TaskUpdateModel:
 *       type: object
 *       required:
 *         - description
 *         - time_estimation
 *         - time_needed
 *         - status
 *         - assignee_id
 *       properties:
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *         time_estimation:
 *           type: number
 *           format: float
 *           description: Updated estimated time to complete the task in hours
 *         time_needed:
 *           type: number
 *           format: float
 *           description: Actual time needed to complete the task in hours
 *         status:
 *           $ref: '#/components/schemas/TaskStatus'
 *         assignee_id:
 *           type: string
 *           description: Identifier of the user this task is assigned to
 * 
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - username
 *         - first_name
 *         - last_name
 *         - is_admin
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         is_admin:
 *           type: boolean
 *           description: Is the user an admin
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         last_login:
 *           type: string
 *           format: date-time
 *           description: The date the user was last logged in
 * 
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
 * 
 *     TaskWithAssigneeInfo:
 *       type: object
 *       properties:
 *         task:
 *           $ref: '#/components/schemas/TaskModel'
 *           description: Task details
 *         assignee:
 *           $ref: '#/components/schemas/User'
 *           description: Assignee user details
 *       description: A task model with detailed assignee information
 * 
 *     TaskWithAssigneeTimeLogInfo:
 *       type: object
 *       properties:
 *         task:
 *           $ref: '#/components/schemas/TaskModel'
 *           description: Task details
 *         time_logs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeLog'
 *           description: Time logs for the task
 *         assignee:
 *           $ref: '#/components/schemas/User'
 *           description: Assignee user details
 *       description: A task model with detailed assignee information
 * 
 */


/**
 * @swagger
 * /api/task/get-by-story/{story_id}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get all tasks for a specific story
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: story_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the story
 *     responses:
 *       200:
 *         description: A list of tasks for the specified story
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskWithAssigneeTimeLogInfo'
 *       404:
 *         description: No tasks found / Assignee not found for task
 *       500:
 *         description: Internal server error
 */
// Get all tasks for a specific story
router.get('/get-by-story/:story_id', jwtGuard, TaskController.getTasksByStory);


/**
 * @swagger
 * /api/task/get-by-assignee/{assignee_id}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get all tasks assigned to a specific assignee
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: assignee_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assignee
 *     responses:
 *       200:
 *         description: A list of tasks assigned to the specified assignee
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskWithAssigneeTimeLogInfo'
 *       404:
 *         description: No tasks found / Assignee not found for task
 *       500:
 *         description: Internal server error
 */
// Get all tasks assigned to a specific assignee
router.get('/get-by-assignee/:assignee_id', jwtGuard, TaskController.getTasksByAssignee);


/**
 * @swagger
 * /api/task/get-by-sprint/{sprint_id}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get all tasks for a specific sprint
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: sprint_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the sprint
 *     responses:
 *       200:
 *         description: A list of tasks for the specified sprint
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskWithAssigneeTimeLogInfo'
 *       404:
 *         description: No tasks found / Assignee not found for task
 *       500:
 *         description: Internal server error
 */
// Get all tasks for a specific sprint
router.get('/get-by-sprint/:sprint_id', jwtGuard, TaskController.getTaskBySprint);



/**
 * @swagger
 * /api/task/get/{id}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get a specific task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: A task for the specified id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskWithAssigneeTimeLogInfo'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
// Get a specific task by ID
router.get('/get/:id', jwtGuard, TaskController.getTask);


/**
 * @swagger
 * /api/task/create:
 *   post:
 *     security:
 *       - jwt: []
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreateModel'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       404:
 *         description: Story or Assignee not found
 *       500:
 *         description: Error creating the task
 */
// Create a new task
router.post('/create', jwtGuard, TaskController.createTask);


/**
 * @swagger
 * /api/task/update/{id}:
 *   put:
 *     security:
 *       - jwt: []
 *     summary: Update a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdateModel'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task or Assignee not found
 *       500:
 *         description: Error updating the task
 */
// Update a task by ID
router.put('/update/:id', jwtGuard, TaskController.updateTask);


/**
 * @swagger
 * /api/task/delete/{id}:
 *   delete:
 *     security:
 *       - jwt: []
 *     summary: Delete a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting the task
 */
// Delete a task by ID
router.delete('/delete/:id', jwtGuard, TaskController.deleteTask);


export default router;
