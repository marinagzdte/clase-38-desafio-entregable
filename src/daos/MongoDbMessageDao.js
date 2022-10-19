import MongoDbContainer from '../containers/MongoDbContainer.js';
import mongoose from 'mongoose';

const Author = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true }
})

class MongoDbMessagesDao extends MongoDbContainer {
    constructor() {
        super('messages', new mongoose.Schema({
            author: { type: Author, required: true },
            text: { type: String, required: true },
            timestamp: { type: String, required: true }
        }));
    }
}

export default MongoDbMessagesDao;