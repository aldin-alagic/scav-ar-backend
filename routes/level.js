import { Router } from "express";
const router = Router();

import * as levelController from "../controllers/level.js";

/**
 * @swagger
 * /level:
 *  get:
 *    tags:
 *    - "level"
 *    summary: Get user's current level
 *    security:
 *    - bearerAuth: []
 *    responses:
 *      '200':
 *        description: A successful response, denoting that the users's level has been found
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            message:
 *              type: string
 *              default: ""
 *            data:
 *      '400':
 *        description: An unsuccesful response
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: false
 *            message:
 *              type: string
 */

 router.get("/", levelController.getUserLevel);

export default router;
