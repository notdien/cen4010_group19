import {uri_key} from './keys';

const { MongoClient, MongoServerError } = require('mongodb');

const client = new MongoClient(uri_key);

const bcrypt = require('bcrypt');

// uncomment if needed

// pings the db to make sure it works for
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

// basic commands - add, delete, update and read users
// add a new to do
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

//test post method for adding a new task to the database
// const new_do: item = {
//     name: "Water my plants",
//     description: "My plants are dying",
//     creation_date: "7/14/2023"
// }

// addToDo(new_do)

// deletes a to-do
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

// this is a wrong name to test - enter a correct name to make sure it deletes
// deleteItem({"name": "Fight a bear!"});

// updates an item
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

// gets all the to-dos
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
// creates a new users

interface newUser {
    username: string,
    password: string,
    to_dos: Array<string>
}

export const createUser = async function(new_user: newUser) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('Users');

        const {username, password, to_dos} = new_user

        const hashedPassword = await bcrypt.hash(password, 10);

        const hashedUser = {
            username,
            password: hashedPassword,
            to_dos
        }

        const results = await myCollection.insertOne(hashedUser);
        console.log("Created new user successfully!");
    } catch (error) {
        if(error instanceof MongoServerError) {
            console.log(`Error ${error}`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// const new_u: newUser = {
//     username: "Jason",
//     password: "12345",
//     to_dos: []
// }

// createUser(new_u)

// finds users by name
export const findUserByUsername = async function(username: string) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('Users');

        const results = await myCollection.findOne({ username });
        console.log (results);
        return results
    } catch (error) {
        if(error instanceof MongoServerError) {
            console.log(`Error $(error)`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// findUserByUsername("Dien")

// compare passwords to make sure they are correct
export const comparePasswords = async function(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}

interface item {
    name: string,
    description: string,
    creation_date: string
}

// re-doing method for adding to-do's
export const add_Todo = async function(username: string, newItem: item) {
    try {
        await client.connect()

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('Users');

        await myCollection.updateOne({username}, {$push: {to_dos: newItem}})
        console.log(`Inserted new to-do`)
    }catch (error) {
        if(error instanceof MongoServerError) {
            console.log(`Error $(error)`);
        }
        throw error;
    }finally {
        await client.close();
    }
}

// const new_Item: item = {
//     name: "Water the plants",
//     description: "My plants are dying",
//     creation_date: "7/28/2023"
// }

// add_Todo("Jack", new_Item)