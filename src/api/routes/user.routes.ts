import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();


/**
 * @swagger
 * /api/user/get-all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/get-all", UserController.getUsers);


/**
 * @swagger
 * /api/user/get/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get("/get/:id", UserController.getUser);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update a user's information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.put("/update/:id", UserController.updateUser);

/**
 * @swagger
 * /api/user/update-last-login/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was deleted successfully
 *       404:
 *         description: The user was not found
 */
router.delete("/update-last-login/:id", UserController.updateLastLogin);

export default router;



/**
 * @swagger
 * components:
 *   schemas:
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
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 */