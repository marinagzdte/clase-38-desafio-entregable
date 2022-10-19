import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export default {
    mariaDb: {
        client: "mysql",
        connection: {
            host: '127.0.0.1',
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: 'mocks-normalizr'
        }
    },
    mongodb: {
        connectionString: process.env.MONGODB_CONNECTION_STRING,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    log4js: {
        appenders: {
            info: { type: "console" },
            errFile: { type: "file", filename: "error.log" },
            warnFile: { type: "file", filename: "warn.log" },

            log: { type: 'logLevelFilter', appender: 'info', level: 'all' },
            errLog: { type: 'logLevelFilter', appender: 'errFile', level: 'error' },
            warnLog: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn' },
        },
        categories: {
            default: {
                appenders: ['log', 'errLog', 'warnLog'],
                level: 'all'
            }
        }
    }
}
