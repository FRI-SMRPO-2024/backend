import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { jwtGuard } from '../guards/jwt-guard';
import { roleAdminGuard } from '../guards/role-admin-guard';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *         access_token:
 *           type: string
 *         refresh_token:
 *           type: string
 *     UserSignupResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UserLoginResponse'
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
router.post('/login', jwtGuard, AuthController.login);

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
router.post('/signup', jwtGuard, AuthController.signup);

/**
 * @swagger
 * /api/auth/change-password/{id}:
 *   post:
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
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       404:
 *         description: User not found
 */
router.post('/change-password/:id', [jwtGuard, roleAdminGuard], AuthController.changePasswordAdmin);


/**
 * @swagger
 * /api/auth/delete-user/{id}:
 *   post:
 *     summary: Delete a user's account
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/delete-user/:id', [jwtGuard, roleAdminGuard], AuthController.deleteUserAdmin);

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
router.post('/logout', jwtGuard, AuthController.logout);

export default router;
