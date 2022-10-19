import { getInfo } from "../business/info.js";
import logger from "../utils/logger.js";

const get = (req, res) => {
    try {
        const info = getInfo();
        res.render('info', info);
    } catch (error) {
        logger.logError(error);
    }
}

export { get }