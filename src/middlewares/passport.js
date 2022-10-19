import passport from 'passport';
import passportLocal from 'passport-local';
import bCrypt from 'bcrypt';
import MongoDbUsersDao from '../daos/MongoDbUsersDao.js';
import logger from '../utils/logger.js';
const userContainer = new MongoDbUsersDao();

/*-----------------------------------------------*/
/*                 passport                      */
/*-----------------------------------------------*/

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

const hash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use('login', new passportLocal.Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const user = await userContainer.getByCondition({ username: username });

            if (!isValidPassword(user, password)) {
                logger.logWarn('Contraseña inválida.');
                return done(null, false);
            }

            logger.logInfo(`Usuario ${user.username} autenticado.`)
            return done(null, user);
        }
        catch (error) {
            logger.logWarn(`Usuario ${username} no encontrado.`);
            return done(null, false);
        }
    }

));

passport.use('register', new passportLocal.Strategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const user = await userContainer.getByCondition({ username: username });
            if (user) {
                logger.logWarn(`El usuario ${username} ya existe.`);
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: hash(password),
                name: req.body.name
            }

            await userContainer.save(newUser);
            logger.logInfo(`Nuevo usuario registrado: ${newUser.username}`);
            return done(null, newUser);

        } catch (error) {
            logger.logError(`error en registro: ${error}`)
            return done(error);
        }
    }
))

export default passport;