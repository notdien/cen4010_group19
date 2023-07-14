"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(express_1.default.json());
app.post('/create', (req, res) => {
    const { name, description, reason } = req.body;
    const newList = {
        name,
        description,
        reason,
        todos: []
    };
    res.status(201).json(newList);
});
app.listen(5678);
console.log("Server is running...");
