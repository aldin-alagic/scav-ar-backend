import { Router } from "express";
const router = Router();

import * as itemController from "../controllers/item.js";

/**
 * @swagger
 * /item:
 *  post:
 *    tags:
 *    - "item"
 *    summary: Create a new item
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - name: "body"
 *      in: "body"
 *      description: "New item information"
 *      schema:
 *        type: "object"
 *        properties:
 *          name:
 *            type: string
 *            description: Item name
 *          description:
 *            type: string
 *            description: Item description
 *          image:
 *            type: string
 *            description: Image of the item in Base64 format
 *          levelId:
 *            type: integer
 *            description: Id of the item's level
 *    responses:
 *      '200':
 *        description: A successful response, denoting that the item has been successfully created.
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            message:
 *              type: string
 *              default: Item successfully created!
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

router.post("/", itemController.addItem);

/**
 * @swagger
 * /item/{itemId}:
 *  post:
 *    tags:
 *    - "item"
 *    summary: Find item
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - name: "itemId"
 *      in: "path"
 *      description: "ID of the item that has been found"
 *    responses:
 *      '200':
 *        description: A successful response, denoting that the item has been marked as found
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            message:
 *              type: string
 *              default: "Item has been found!"
 *            data:
 *      '201':
 *        description: A successful response, denoting that the level was marked as completed
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            message:
 *              type: string
 *              default: "Level has been completed!"
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

router.post("/:itemId", itemController.findItem);



export default router;
