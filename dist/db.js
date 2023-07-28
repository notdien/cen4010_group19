"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_Todo = exports.get_Todo = exports.add_Todo = exports.comparePasswords = exports.findUserByUsername = exports.createUser = exports.getList = exports.updateItem = exports.deleteItem = exports.addToDo = void 0;
const keys_1 = require("./keys");
const { MongoClient, MongoServerError } = require('mongodb');
const client = new MongoClient(keys_1.uri_key);
const bcrypt = require('bcrypt');
// uncomment if needed
// pings the db to make sure it works for
const ping = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db("admin").command({ ping: 1 });
            console.log("Connected to DB!");
        }
        catch (error) {
            console.error('Error connecting to DB:', error);
        }
        finally {
            yield client.close();
        }
    });
};
// ping();
// basic commands - add, delete, update and read users
// add a new to do
const addToDo = function (creationData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('To-dos');
            const result = yield myCollection.insertOne(creationData);
            console.log(`Inserted new to-do`);
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error ${error}`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.addToDo = addToDo;
//test post method for adding a new task to the database
// const new_do: item = {
//     name: "Water my plants",
//     description: "My plants are dying",
//     creation_date: "7/14/2023"
// }
// addToDo(new_do)
// deletes a to-do
const deleteItem = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('To-dos');
            const result = yield myCollection.deleteOne(name);
            if (result.deletedCount === 1) {
                console.log("Successfully deleted that TO-do.");
            }
            else {
                console.log("That TO-do doesn't exist - nothing to delete");
            }
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error ${error}`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.deleteItem = deleteItem;
// this is a wrong name to test - enter a correct name to make sure it deletes
// deleteItem({"name": "Fight a bear!"});
// updates an item
const updateItem = function (name, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('To-dos');
            const newChange = {
                $set: updateData
            };
            const result = yield myCollection.updateOne(name, newChange);
            if (result.modifiedCount > 0) {
                console.log("Updated that TO-do!");
            }
            else {
                console.log("That TO-do doesn't exist - nothing to update");
            }
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error ${error}`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.updateItem = updateItem;
// updateItem({"name": "test"}, {"description": "Code my update for me please"})
// gets all the to-dos
const getList = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('To-dos');
            const cursor = yield myCollection.find().toArray();
            if (cursor.length === 0) {
                console.log("TO-do list is empty");
            }
            else {
                cursor.forEach((doc) => console.log(doc));
                return cursor;
            }
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error ${error}`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.getList = getList;
const createUser = function (new_user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('Users');
            const { username, password, to_dos } = new_user;
            const hashedPassword = yield bcrypt.hash(password, 10);
            const hashedUser = {
                username,
                password: hashedPassword,
                to_dos
            };
            const results = yield myCollection.insertOne(hashedUser);
            console.log("Created new user successfully!");
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error ${error}`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.createUser = createUser;
// const new_u: newUser = {
//     username: "Jason",
//     password: "12345",
//     to_dos: []
// }
// createUser(new_u)
// finds users by name
const findUserByUsername = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('Users');
            const results = yield myCollection.findOne({ username });
            console.log(results);
            return results;
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error $(error)`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.findUserByUsername = findUserByUsername;
// findUserByUsername("Dien")
// compare passwords to make sure they are correct
const comparePasswords = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.compare(password, hashedPassword);
    });
};
exports.comparePasswords = comparePasswords;
// re-doing method for adding to-do's
const add_Todo = function (username, newItem) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('Users');
            yield myCollection.updateOne({ username }, { $push: { to_dos: newItem } });
            console.log(`Inserted new to-do`);
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error $(error)`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.add_Todo = add_Todo;
// const new_Item: item = {
//     name: "Water the plants",
//     description: "My plants are dying",
//     creation_date: "7/28/2023"
// }
// add_Todo("Jack", new_Item)
// method for only using the user's to-dos - find by using username
const get_Todo = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('Users');
            const pipeline = [
                { $match: { username } },
                { $project: { _id: 0, to_dos: 1 } },
            ];
            const cursor = myCollection.aggregate(pipeline);
            const result = yield cursor.toArray();
            if (result.length === 0) {
                console.log("No list is associated with that username...");
                return "No list is associated with that username...";
            }
            else {
                const doArray = result[0].to_dos;
                console.log(doArray);
                return doArray;
            }
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error $(error)`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.get_Todo = get_Todo;
// get_Todo("Jack");
// delete a to-do
const delete_Todo = function (username, toDo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('Users');
            yield myCollection.updateOne({ username }, { $pull: { to_dos: { name: toDo } } });
            console.log("Removed that to-do!");
        }
        catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error $(error)`);
            }
            throw error;
        }
        finally {
            yield client.close();
        }
    });
};
exports.delete_Todo = delete_Todo;
// delete_Todo("Jeff", "Breathe");
