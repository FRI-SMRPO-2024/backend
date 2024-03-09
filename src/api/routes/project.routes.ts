import express from 'express';
import { ProjectController } from '../controllers/project.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - documentation
 *         - owner_id
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the project
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         documentation:
 *           type: string
 *           description: Documentation URL or text for the project
 *         owner_id:
 *           type: string
 *           description: The user ID of the project owner
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the project was created
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectCreateRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - owner_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         owner_id:
 *           type: string
 *           description: The user ID of the project owner
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectUpdateRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - documentation
 *         - owner_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         documentation:
 *           type: string
 *           documentation: Documentation of the project
 * 
 */

/**
 * @swagger
 * /api/project/get-all:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found
 *       500:
 *         description: Unauthorized
 */
router.get("/get-all", ProjectController.getProjects);


/**
 * @swagger
 * /api/project/get/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The project description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: The project was not found
 *       500:
 *         description: Unauthorized
 */
router.get("/get/:id", ProjectController.getProject);


/**
 * @swagger
 * /api/project/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreateRequest'
 *     responses:
 *       200:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error creating project
 */

router.post("/create", ProjectController.createProject);


/**
 * @swagger
 * /api/project/update/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdateRequest'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       400:
 *         description: Error updating project
 */
router.put("/update/:id", ProjectController.updateProject);


/**
 * @swagger
 * /api/project/delete/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       400:
 *         description: Error deleting project
 */
router.delete('/delete/:id', ProjectController.deleteProject);


export default router;