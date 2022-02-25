import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */

export default interface FollowDaoI {
    userFollowsUser (uid: string, uuid: string): Promise<any>;
    userUnfollowsUser (uid: string, fid: string): Promise<any>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowingUser (uid: string): Promise<Follow[]>;

};