/**
 * @file controller for RESTful web service API for follow resource
 */

import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
import Follow from "../models/Follow";

/**
 * @class FollowController implements RESTful web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li> POST /api/users/:uid/follows/:uid to record that a user follows a user
 *  </li>
 *  <li> DELETE /api/users/:uid/unfollows/:uid to record that a user no longer follows
 *  another user </li>
 *  <li> GET /api/users/:uid/follows to retrieve all the users followed by a user
 *  </li>
 *  <li> GET /api/users/:uid/followers to retrieve all the users that are following
 *  a user </li>
 *</ul>

 @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 @property {FollowController} FollowController Singleton controller implementing
 RESTful web service API
 */

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uuid", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid/unfollows/:fid", FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersFollowingUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * @param {Request} req represents request from client, including the path parameters
     * uid and uuid representing the user (uid) that is following another
     * user (uuid)
     * @param {Response} res represents response to client, including the body formatted as
     * a JSON containing the User that is being followed (uuid) and the user that is doing
     * the following (uid) that have been inserted into the database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.uuid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req represents request from client, including the path parameters
     * uid and uuid representing the user (uid) and the follow that is being removed (fid)
     * @param {Response} res represents response to client, including the status on whether
     * deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.fid)
            .then(status => res.send(status));

    /**
     * Retrieves all users followed by a user
     * @param {Request} req representing request from client, including the path parameter
     * uid representing the user that followed other users
     * @param {Response} req representing the client response, including the body formatted
     * as JSON arrays containing the user objects
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users following a user
     * @param {Request} req representing request from client, including the path parameter
     * uid representing the user that is followed by other users
     * @param {Response} res representing the client response, including the body formatted
     * as JSON arrays containing the user objects
     */
    findAllUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowingUser(req.params.uid)
            .then(follows => res.json(follows));


};
