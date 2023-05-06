import { Request, Response } from 'express';

export const getSignUpPage = (_req: Request, res: Response) => {
  res.render('signUp');
};
