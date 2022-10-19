import util from 'util';
import normalizr from 'normalizr';
import postSchema from '../schemas/PostSchema.js';

export const normalizeMessages = (messages) => {
    const post = { id: '1', messages: messages }
    const normalizedPost = normalizr.normalize(post, postSchema);

    //console.log('---- Objeto sin normalizar ----');
    //console.log(post);
    const denormalizedLength = JSON.stringify(post).length;
    //console.log(`longitud sin normalizar: ${denormalizedLength}`)

    //console.log('\n\n---- Objeto normalizado ----')
    //console.log(util.inspect(normalizedPost, false, 12, true));
    const normalizedLength = JSON.stringify(normalizedPost).length;
    //console.log(`longitud normalizado: ${normalizedLength}`)

    const compression = normalizedLength * 100 / denormalizedLength;
    //console.log(`\ncompresión: %${Math.ceil(compression)}`);
}