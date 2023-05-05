import { Router } from 'express';
import { getSignUpPage } from './controller';

const router = Router();

router.get('/', getSignUpPage);

export { router };
