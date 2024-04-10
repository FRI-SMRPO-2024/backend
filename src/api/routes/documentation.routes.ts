import express from 'express';
import { DocumentationController } from '../controllers/documentation.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documentation
 *   description: Documentation management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DocumentationModel:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - text
 *         - date
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the documentation entry
 *         project_id:
 *           type: integer
 *           description: ID of the project associated with this documentation
 *         text:
 *           type: string
 *           description: The text content of the documentation
 *         date:
 *           type: string
 *           format: date
 *           description: The date the documentation was created or relevant for
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the documentation entry was created

 *     DocumentationCreateRequestModel:
 *       type: object
 *       required:
 *         - project_id
 *         - text
 *         - date
 *       properties:
 *         project_id:
 *           type: integer
 *           description: ID of the project to associate the documentation with
 *         text:
 *           type: string
 *           description: The text content of the documentation
 *         date:
 *           type: string
 *           format: date
 *           description: The date the documentation is created or relevant for

 *     DocumentationUpdateRequestModel:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - text
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the documentation entry to be updated
 *         project_id:
 *           type: integer
 *           description: ID of the project associated with this documentation
 *         text:
 *           type: string
 *           description: The text content of the documentation
 *         date:
 *           type: string
 *           format: date
 *           description: The date the documentation is updated or relevant for
 */


/**
 * @swagger
 * /api/documentation/get-by-project/{project_id}:
 *   get:
 *     summary: Retrieve documentation by project ID
 *     tags: [Documentation]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the project
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: An array of documentation associated with the project ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentationModel'
 *       404:
 *         description: Documentation for project not found / Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-project/:project_id', jwtGuard, DocumentationController.getDocumentationByProject);

/**
 * @swagger
 * /api/documentation/get-by-id/{id}:
 *   get:
 *     summary: Retrieve a single documentation entry by ID
 *     tags: [Documentation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the documentation entry
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Documentation entry data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentationModel'
 *       404:
 *         description: Documentation not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-id/:id', jwtGuard, DocumentationController.getDocumentationById);

/**
 * @swagger
 * /api/documentation/create:
 *   post:
 *     summary: Create new documentation
 *     tags: [Documentation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentationCreateRequestModel'
 *     security:
 *       - jwt: []
 *     responses:
 *       201:
 *         description: Documentation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentationModel'
 *       404:
 *         description: Project not found
 *       409:
 *         description: Documentation for project already exists.
 *       500:
 *         description: Error creating documentation
 */
router.post('/create', jwtGuard, DocumentationController.createDocumentation);

/**
 * @swagger
 * /api/documentation/update/{id}:
 *   put:
 *     summary: Update an existing documentation entry
 *     tags: [Documentation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the documentation to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentationUpdateRequestModel'
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Documentation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentationModel'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating documentation
 */
router.put('/update/:id', jwtGuard, DocumentationController.updateDocumentation);

/**
 * @swagger
 * /api/documentation/delete/{id}:
 *   delete:
 *     summary: Delete a documentation entry
 *     tags: [Documentation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Unique identifier of the documentation to be deleted
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Documentation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentationModel'
 *       500:
 *         description: Error deleting documentation
 */
router.delete('/delete/:id', jwtGuard, DocumentationController.deleteDocumentation);


export default router;