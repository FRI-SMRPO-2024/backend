import express from 'express';
import { AuthController } from '../controllers/auth.controller';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful signup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignupResponse'
 *       400:
 *         description: Error signing up
 */
router.post('/signup', AuthController.signup);

/**
 * @swagger
 * /api/auth/change-password/{id}:
 *   put:
 *     summary: Change a user's password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       404:
 *         description: User not found
 */
router.put('/change-password/:id', AuthController.changePassword);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - access_token
 *             properties:
 *               access_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful logout
 *       400:
 *         description: Error logging out
 */
router.post('/logout', AuthController.logout);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           nullable: true
 *         access_token:
 *           type: string
 *           nullable: true
 *         refresh_token:
 *           type: string
 *           nullable: true
 *     UserSignupResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UserLoginResponse'
 */