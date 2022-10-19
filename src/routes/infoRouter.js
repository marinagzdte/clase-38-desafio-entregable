import { get } from "../controllers/infoController.js";
import { Router } from 'express';
import logger from '../utils/logger.js';

const infoRouter = new Router();

infoRouter.get('/info', logger.logReqInfo, get)

export default infoRouter;