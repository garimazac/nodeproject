/**
 * @file A user can follow other user. It is a relationship
 * between two users. A user can follow another user or be followed by
 * another user
 */
import User from "./User";

/**
 * @typedef Follow represents a relationship between two users. For
 * example, a user can follow another user, or be followed by another
 * user
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User,
};