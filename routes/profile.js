import { Router } from "express";
const router = Router();

import * as profileController from "../controllers/profile.js";

/**
 * @swagger
 * /user/{userId}:
 *  patch:
 *    tags:
 *    - "profile"
 *    summary: Update user profile information
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - name: "body"
 *      in: "body"
 *      description: "User's information. At least one property should be passed"
 *      schema:
 *        type: "object"
 *        properties:
 *          about:
 *            type: "string"
 *            description: General information about the user
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            message:
 *              type: string
 *              default: Your information has been updated!
 *            data:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  description: ID of the user
 *                fullname:
 *                  type: string
 *                  description: User's full name
 *                email:
 *                  type: string
 *                  description: User's email address
 *                profile_photo:
 *                  type: string
 *                  description: AWS S3 file key to the profile photo of the user who made the post
 *                about:
 *                  type: string
 *                  description: About text
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
 *
 */

router.patch("/:userId", profileController.updateProfile);

/**
 * @swagger
 * /user/{userId}/profile-photo:
 *  post:
 *    tags:
 *    - "profile"
 *    consumes:
 *      - multipart/form-data
 *    summary: Uploads user's profile photo
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - name: "userId"
 *      in: "path"
 *      description: "User ID"
 *    - name: "photo"
 *      in: "body"
 *      schema:
 *        type: "object"
 *        properties:
 *          photo:
 *            type: "string"
 *            description: Profile photo in Base64 format
 *    responses:
 *      '200':
 *        description: A successful response, denoting that the profile photo has been successfully uploaded
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            data:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Your new profile photo has been set!
 *                photo_key:
 *                  type: string
 *                  description: Key under which the photo has been stored
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

router.post("/:userId/profile-photo", profileController.uploadProfilePhoto);

/**
 * @swagger
 * /user/profile:
 *  get:
 *    tags:
 *    - "profile"
 *    summary: Get profile information for the currently signed in user
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - name: "userId"
 *      in: "path"
 *      description: "User ID"
 *    responses:
 *      '200':
 *        description: A successful response, with information belonging to the specified user
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: true
 *            data:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                  description: ID of the user
 *                fullname:
 *                  type: string
 *                  description: User's full name
 *                username:
 *                  type: string
 *                  description: User's username
 *                email:
 *                  type: string
 *                  description: User's email address
 *                profile_photo:
 *                  type: string
 *                  description: AWS S3 file key to the profile photo of the user who made the post
 *                about:
 *                  type: string
 *                  description: About text
 *      '404':
 *        description: User with the given ID does not exist
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              default: false
 *            message:
 *              type: string
 *              default: "User with the given ID does not exist!"
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
router.get("/profile", profileController.getMyProfile);

export default router;