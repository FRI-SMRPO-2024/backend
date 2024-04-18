import express from 'express';
import { ProjectWallController } from '../controllers/project-wall.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Project Wall
 * description: Project Wall API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectWallModel:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - user_id
 *         - content
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the project wall
 *         project_id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the project
 *         user_id:
 *           type: string
 *           description: The unique identifier of the user
 *         content:
 *           type: string
 *           description: The content of the project wall
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the project wall was created
 *       example:
 *         id: 1
 *         project_id: 1
 *         user_id: "0effc4c8-f7fd-4beb-8f5e-52d9fe8b7a98"
 *         content: "This is a project wall content"
 *         created_at: "2021-09-01T12:00:00Z"
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
 *     ProjectWallReturnModel:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - user
 *         - content
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the project wall
 *         project_id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier of the project
 *         user:
 *           $ref: '#/components/schemas/User'
 *         content:
 *           type: string
 *           description: The content of the project wall
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the project wall was created
 *       example:
 *         id: 1
 *         project_id: 1
 *         user: 
 *           id: "0effc4c8-f7fd-4beb-8f5e-52d9fe8b7a98"
 *           email: ""
 *           username: "user1"
 *           first_name: "User"
 *           last_name: "One"
 *           is_admin: false
 *           created_at: "2021-09-01T12:00:00Z"
 *           last_login: "2021-09-01T12:00:00Z"
 *         content: "This is a project wall content"
 *         created_at: "2021-09-01T12:00:00Z"
 *         
 */


/**
 * @swagger
 * /api/project-wall/get-by-project/{projectId}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get project wall for a project
 *     tags: [Project Wall]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the project
 *     responses:
 *       200:
 *         description: Project wall retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectWallReturnModel'
 *       404:
 *         description: Project wall not found
 *       500:
 *         description: Error getting project wall
 */

router.get('/get-by-project/:projectId', jwtGuard, ProjectWallController.getProjectWall);

/**
 * @swagger
 * /api/project-wall/get-by-id/{projectWallId}:
 *   get:
 *     security:
 *       - jwt: []
 *     summary: Get project wall by ID
 *     tags: [Project Wall]
 *     parameters:
 *       - in: path
 *         name: projectWallId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the project wall
 *     responses:
 *       200:
 *         description: Project wall retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectWallReturnModel'
 *       404:
 *         description: Project wall not found
 *       500:
 *         description: Error getting project wall
 */


router.get('/get-by-id/:projectWallId', jwtGuard, ProjectWallController.getProjectWallById);

/**
 * @swagger
 * /api/project-wall/create:
 *   post:
 *     security:
 *       - jwt: []
 *     summary: Add a new project wall entry
 *     tags: [Project Wall]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectWallModel'
 *     responses:
 *       201:
 *         description: Project wall added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectWallModel'
 *       404:
 *         description: Project wall not added
 *       500:
 *         description: Error adding project wall
 */

router.post('/create', jwtGuard, ProjectWallController.addToProjectWall);

/**
 * @swagger
 * /api/project-wall/delete/{projectWallId}:
 *   delete:
 *     security:
 *       - jwt: []
 *     summary: Delete a project wall entry
 *     tags: [Project Wall]
 *     parameters:
 *       - in: path
 *         name: projectWallId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the project wall
 *     responses:
 *       200:
 *         description: Project wall deleted successfully
 *       404:
 *         description: Project wall not deleted
 *       500:
 *         description: Error deleting project wall
 */

router.delete('/delete/:projectWallId', jwtGuard, ProjectWallController.deleteFromProjectWall);

/**
 * @swagger
 * /api/project-wall/update/{projectWallId}:
 *   put:
 *     security:
 *       - jwt: []
 *     summary: Update a project wall entry
 *     tags: [Project Wall]
 *     parameters:
 *       - in: path
 *         name: projectWallId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the project wall
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectWallModel'
 *     responses:
 *       200:
 *         description: Project wall updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectWallModel'
 *       404:
 *         description: Project wall not updated
 *       500:
 *         description: Error updating project wall
 */

router.put('/update/:projectWallId', jwtGuard, ProjectWallController.updateProjectWall);

export default router;