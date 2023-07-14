import {uri_key} from './keys';

const { MongoClient, MongoServerError } = require('mongodb');

let uri = uri_key;

const client = new MongoClient(uri);

const ping = async function() {
    try {
        await client.connect();

        await client.db("admin").command({ping: 1});
        console.log("Connected to DB!");
    } finally {
        await client.close();
    }
}

ping();