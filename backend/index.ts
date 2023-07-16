import { error } from 'console';
import express, { Express, NextFunction, Request, Response } from 'express';
import { addToDo, deleteItem, updateItem, getList } from './db'

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// basic commands

interface new_todo {
    name: string;
    description: string;
    creation_date: string;
}

app.use(express.json());
app.post('/create', async (req: Request, res: Response) => {
    const { name, description, creation_date } = req.body;

    const newTodo: new_todo = {
        name,
        description,
        creation_date
    }

    addToDo(newTodo)
    return res.status(201).json({Success: "Created new To-do Successfully!", newTodo});
});

app.delete('/to-do/:name', async (req: Request, res: Response) => {
    var name = req.params.name;

    deleteItem({name});
    return res.status(201).json({Success: "Deleted list successfully!", name});
})

app.get('/to-do', async (req: Request, res: Response) => {
    var results = await getList();
    return res.status(201).send(results);

})

interface new_changes {
    description: string,
    creation_date: string
}

app.put('/to-do/:name', async (req: Request, res: Response) => {
    var name = req.params.name;
    const { description, creation_date } = req.body;

    const newChanges: new_changes = {
        description,
        creation_date
    }

    updateItem({name}, newChanges)
    return res.status(201).send(newChanges);

})

// user login

app.listen(5678);
console.log("Server is running...");