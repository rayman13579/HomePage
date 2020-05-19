require('dotenv').config();
const Mongo = require('mongodb').MongoClient;
const url = process.env.URL + ':' + process.env.MONGOPORT;
const client = new Mongo(url,  {useUnifiedTopology: true});
const dbName = 'site';

let connect = async () => {
    await client.connect();
}
let insert = async (collection, param1, param2) => {
    let db = await client.db(dbName);
    let doc;
    if (collection === 'user') {
        doc = { username: param1, password: param2 };
    } else if (collection === 'token') {
        doc = { token: param1, user: param2 };
    }

    await db.collection(collection).insertOne(doc);
}
let find = async (collection) => {
    let db = await client.db(dbName);
    return (await db.collection(collection).find({}).toArray());
}
let empty = async (collection) => {
    let db = await client.db(dbName);
    await db.collection(collection).deleteMany({});
}
let close = async () => await client.close();

module.exports = {
    connect: connect,
    insert: insert,
    find: find,
    close: close,
    empty: empty
}