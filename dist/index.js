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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const keys_1 = require("./keys");
// const session = require('express-session'); 
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: keys_1.uri_key,
    resave: false,
    saveUninitialized: true
}));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, creation_date } = req.body;
    const newTodo = {
        name,
        description,
        creation_date
    };
    (0, db_1.addToDo)(newTodo);
    return res.status(201).json({ Success: "Created new To-do Successfully!", newTodo });
}));
// deletes a to-do from the DB
app.delete('/to-do/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var name = req.params.name;
    var results = (0, db_1.deleteItem)({ name });
    return res.status(200).send(results);
}));
// gets all the to-dos
app.get('/to-do', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var results = yield (0, db_1.getList)();
    return res.status(200).send(results);
}));
// updates a to-do's description and creation date
app.put('/to-do/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var name = req.params.name;
    const { description, creation_date } = req.body;
    const newChanges = {
        description,
        creation_date
    };
    (0, db_1.updateItem)({ name }, newChanges);
    return res.status(200).send(newChanges);
}));
// user login
// this signs up a user 
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // if it exists - doesn't create user
    const existingUser = yield (0, db_1.findUserByUsername)(username);
    if (existingUser) {
        return res.status(400).json({ Message: 'Username already exists!', existingUser });
    }
    const newUser = yield (0, db_1.createUser)(username, password);
    res.status(201).json({ Message: 'New user created successfully!' });
}));
// user login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // if the user exist does not exist - no login
    const existingUser = yield (0, db_1.findUserByUsername)(username);
    if (!existingUser) {
        return res.status(404).json({ Message: "User does not exist!" });
    }
    // if the password is incorrect - no login
    const validPassword = yield (0, db_1.comparePasswords)(password, existingUser.password);
    if (!validPassword) {
        return res.status(401).json({ Message: "Password is incorrect, please check your username/password again " });
    }
    // other wise - login
    req.session.user = existingUser._id;
    res.json({ Message: 'Login successful!' });
}));
app.listen(5678);
console.log("Server is running...");
