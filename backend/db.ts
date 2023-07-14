import {uri_key} from './keys';

const { MongoClient, MongoServerError } = require('mongodb');

const client = new MongoClient(uri_key);

const ping = async function() {
    try {
        await client.connect();

        await client.db("admin").command({ping: 1});
        console.log("Connected to DB!");
    } catch(error) {
        console.error('Error connecting to DB:', error);
    }
    finally {
        await client.close();
    }
}

// ping();