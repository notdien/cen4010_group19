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

interface item {
    name: string,
    description: string,
    creation_date: string

}

// ping();

// basic commands

export const addToDo = async function(creationData: item) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('To-dos');

        const result = await myCollection.insertOne(creationData);

        console.log(`Inserted new to-do`)
    } catch(error) {
        if (error instanceof MongoServerError) {
            console.log(`Error ${error}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// const new_do: item = {
//     name: "Water my plants",
//     description: "My plants are dying",
//     creation_date: "7/14/2023"
// }

// addToDo(new_do)

export const deleteItem = async function(name: object) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('To-dos');

        const result = await myCollection.deleteOne(name);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted that TO-do.")
        }
        else {
            console.log("That TO-do doesn't exist - nothing to delete")
        }
    } catch(error) {
        if (error instanceof MongoServerError) {
            console.log(`Error ${error}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// deleteItem({"name": "Fight a bear!"});

export const updateItem = async function(name: object, updateData: object) {
    try {

        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('To-dos');

        const newChange = {
            $set: updateData
        }

        const result = await myCollection.updateOne(
            name,
            newChange
        )
        if (result.modifiedCount > 0) {
            console.log("Updated that TO-do!")
        }
        else {
            console.log("That TO-do doesn't exist - nothing to update")
        }
    } catch(error) {
        if (error instanceof MongoServerError) {
            console.log(`Error ${error}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// updateItem({"name": "test"}, {"description": "Code my update for me please"})

export const getList = async function() {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('To-dos');

        const cursor = await myCollection.find().toArray();
        if (cursor.length === 0) {
            console.log("TO-do list is empty");
        }
        else {
            cursor.forEach((doc: any) => console.log(doc));
            return cursor
        }
    } catch (error) {
        if(error instanceof MongoServerError) {
            console.log(`Error ${error}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// getList();

// user login

interface user {
    username: string,
    email: string,
    password: string
}

export const createUser = async function(userCreation: user) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection("Users");
    
        const result = await myCollection.insertOne(userCreation);
    
        console.log("Created new user successfully!")
    } catch (error) {
        if(error instanceof MongoServerError) {
            console.log(`Error ${error}`);
        }
        throw error;
    } finally {
        await client.close()
    }
}

// const new_User: user = {
//     username: "diennn69",
//     email: "thedien7000@gmail.com",
//     password: "123456"
// }

// createUser(new_User);