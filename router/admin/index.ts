import * as express from 'express';
const adminRouter = express.Router();

adminRouter.use('/sign-in', (req: express.Request, res: express.Response) => res.render('admin/signin'));
adminRouter.use('/', (req: express.Request, res: express.Response) => res.render('admin/index'));

export { adminRouter };