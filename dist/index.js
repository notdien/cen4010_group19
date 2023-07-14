"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const db_2 = require("./db");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(express_1.default.json());
app.post('/create', (req, res) => {
    const { name, description, creation_date } = req.body;
    const newTodo = {
        name,
        description,
        creation_date
    };
    (0, db_1.addToDo)(newTodo);
    return res.status(201).json({ Success: "Created new To-do Successfully!", newTodo });
});
// interface object {
//     name: string;
// }
app.delete('/delete', (req, res) => {
    const { name } = req.body;
    const deleteName = {
        name
    };
    (0, db_2.deleteItem)(deleteName);
    return res.status(201).json({ Success: "Deleted list successfully!", deleteName });
});
app.listen(5678);
console.log("Server is running...");
