import { Request, Response } from 'express';
declare const oauthController: {
    googleLogin(req: Request, res: Response): void;
    googleCallback(req: Request, res: Response): void;
    oauthGetUserData(req: Request, res: Response): Promise<void>;
};
export declare function configureOauthPassport(): void;
export default oauthController;
