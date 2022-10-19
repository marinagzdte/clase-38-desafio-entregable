import { getLogin, postLogin, getLogout, getLoginError } from '../controllers/loginController.js';
import passport from '../middlewares/passport.js';
import { Router } from 'express';
import logger from '../utils/logger.js';

const loginRouter = new Router();

loginRouter.get('/login', logger.logReqInfo, getLogin)

loginRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login/error' }), postLogin);

loginRouter.get('/logout', logger.logReqInfo, getLogout)

loginRouter.get('/login/error', logger.logReqInfo, getLoginError)

export default loginRouter;