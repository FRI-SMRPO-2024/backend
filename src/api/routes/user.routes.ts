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
 *       404:
 *         description: No users found
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
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
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               first_name:
 *                 type: string
 *                 description: The first name of the user
 *               last_name:
 *                 type: string
 *                 description: The last name of the user
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       401:
 *         description: Unauthorized
 */
router.put("/update/:id", UserController.updateUser);

/**
 * @swagger
 * /api/user/update-last-login/{id}:
 *   put:
 *     summary: Update a user's last login
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
 *         description: The user's last login was updated successfully
 *       404:
 *         description: The user was not found
 *       401:
 *         description: Unauthorized
 */
router.put("/update-last-login/:id", UserController.updateLastLogin);


/**
 * @swagger
 * /api/user/set-role/{id}:
 *   put:
 *     summary: Update a user's role
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
 *             type: object
 *             properties:
 *               is_admin:
 *                 type: boolean
 *                 description: The role of the user
 *     responses:
 *       200:
 *         description: The user's role was updated successfully
 *       404:
 *         description: The user was not found
 *       401:
 *         description: Unauthorized
 */
router.put("/set-role/:id", UserController.setRole);

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
