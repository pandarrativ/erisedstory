import { Request, Response } from 'express';
declare const authController: {
    registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    setUserRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    logoutUser(req: Request, res: Response): void;
};
export default authController;
