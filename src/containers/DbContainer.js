import knex from 'knex';
import logger from '../utils/logger.js';

class DbContainer {
    constructor(config, tableName) {
        this.dbClient = knex(config);
        this.tableName = tableName;
    }

    async getAllItems() {
        return this.dbClient.from(this.tableName).select()
            .then(rows => { return rows; })
            .catch((err) => {
                logger.logError(err)
                throw err;
            });
    }

    getItemById(id) {
        this.dbClient.from(this.tableName).select().where('id', '=', id)
            .then((allItems) => { return allItems; })
            .catch((err) => {
                logger.logError(err)
                throw err;
            });
    }

    async add(item) {
        this.dbClient(this.tableName).insert(item)
            .then(() => { logger.logInfo('Data insertada'); })
            .catch((err) => {
                logger.logError(err)
                throw err;
            });
    }

    modifyItemById(id, newData) {
        this.dbClient.from(this.tableName).where('id', '=', id).update(newData)
            .then(() => { logger.logInfo('Registro actualizado'); })
            .catch((err) => {
                logger.logError(err)
                throw err;
            });
    }

    deleteItemById(id) {
        this.dbClient.from(this.tableName).where('id', '=', id).del()
            .then(() => { logger.logInfo('Registro borrado'); })
            .catch((err) => {
                logger.logError(err)
                throw err;
            });
    }
}

export default DbContainer