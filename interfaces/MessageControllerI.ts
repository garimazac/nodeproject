import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendMessage(req: Request, res: Response): void;

    findAllMessagesSentByUser(req: Request, res: Response): void;

    findAllMessagesReceivedByUser(req: Request, res: Response): void;

    userDeletesMessage(req: Request, res: Response): void;

    userDeletesAllSentMessages(req: Request, res: Response): void;

    userDeletesAllReceivedMessages(req: Request, res: Response): void;
};
