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

//adding to-do's
export const add_Todo = async function(username: string, newItem: item) {
    try {
        await client.connect();

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

// method for only using the user's to-dos - find by using username
export const get_Todo = async function(username: string) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('Users')

        const pipeline = [
            {$match: {username}},
            {$project : {_id: 0, to_dos: 1}},
        ]

        const cursor = myCollection.aggregate(pipeline);
        const result = await cursor.toArray();

        if (result.length === 0) {
            console.log("No list is associated with that username...")
            return "No list is associated with that username...";
        }
        else {
            const doArray: string[] = result[0].to_dos;
            console.log(doArray);
            return doArray;
        }
    } catch( error ) {
        if(error instanceof MongoServerError) {
            console.log(`Error $(error)`);
        }
        throw error;
    }finally {
        await client.close();
    }
}

// get_Todo("Jack");

// delete a to-do
export const delete_Todo = async function(username: string, toDo: string) {
    try {
        await client.connect();

        const myDB = await client.db('To_do_list');
        const myCollection = myDB.collection('Users')

        await myCollection.updateOne({username}, {$pull: {to_dos: {name: toDo} } })
        console.log("Removed that to-do!");
    } catch (error) {
        if(error instanceof MongoServerError) {
            console.log(`Error $(error)`);
        }
        throw error;
    } finally {
        await client.close();
    }
}

// delete_Todo("Jeff", "Breathe");