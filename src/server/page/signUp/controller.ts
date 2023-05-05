import { Request, Response, NextFunction } from 'express';

export const getSignUpPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('signUp');
};
