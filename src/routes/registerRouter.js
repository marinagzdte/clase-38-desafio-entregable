import { getRegister, postRegister, getRegisterError } from '../controllers/registerController.js';
import passport from '../middlewares/passport.js';
import { Router } from 'express';
import logger from '../utils/logger.js';

const registerRouter = new Router();

registerRouter.get('/register', logger.logReqInfo, getRegister)

registerRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register/error' }), postRegister);

registerRouter.get('/register/error', logger.logReqInfo, getRegisterError)

export default registerRouter;