import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    userFollowsUser = async (uid: string, uuid: string): Promise<any> =>
        FollowModel.create({userFollowing: uid, userFollowed: uuid});

    userUnfollowsUser = async (uid: string, fid: string): Promise<any> =>
        FollowModel.deleteOne({_id: fid, userFollowing: uid});

    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    findAllUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    viewUserFollowing = async (fid: string): Promise<any> =>
        FollowModel.findById(fid)
            .populate("userFollowing")
            .exec();

    viewUserFollowed = async (fid: string): Promise<any> =>
        FollowModel.findById(fid)
            .populate("userFollowed")
            .exec();
}