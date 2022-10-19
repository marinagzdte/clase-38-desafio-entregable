import normalizr from 'normalizr';

const authorSchema = new normalizr.schema.Entity('author')
const messageSchema = new normalizr.schema.Entity('messages', { author: authorSchema })
const postSchema = new normalizr.schema.Entity('post', { messages: [messageSchema] })

export default postSchema;