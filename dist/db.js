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
exports.comparePasswords = exports.findUserByUsername = exports.createUser = exports.getList = exports.updateItem = exports.deleteItem = exports.addToDo = void 0;
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
// getList();
// user login
// creates a new users
const createUser = function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const myDB = yield client.db('To_do_list');
            const myCollection = myDB.collection('Users');
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = {
                username,
                password: hashedPassword
            };
            const results = yield myCollection.insertOne(user);
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
// createUser(("Sean"), ("54321"));
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
