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
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(express_1.default.json());
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
app.delete('/to-do/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var name = req.params.name;
    (0, db_1.deleteItem)({ name });
    return res.status(201).json({ Success: "Deleted list successfully!", name });
}));
app.get('/to-do', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var results = yield (0, db_1.getList)();
    return res.status(201).send(results);
}));
app.put('/to-do/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var name = req.params.name;
    const { description, creation_date } = req.body;
    const newChanges = {
        description,
        creation_date
    };
    (0, db_1.updateItem)({ name }, newChanges);
    return res.status(201).send(newChanges);
}));
app.listen(5678);
console.log("Server is running...");
