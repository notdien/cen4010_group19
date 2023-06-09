import { error } from 'console';
import express, { Express, NextFunction, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

interface new_todo {
    name: string;
    description: string;
    creation_date: string;
}

app.use(express.json());
app.post('/create', (req: Request, res: Response) => {
    const { name, description, creation_date } = req.body;

    const newTodo: new_todo = {
        name,
        description,
        creation_date
    }

    return res.status(201).json({Success: "Created new To-do Successfully!", newTodo});
});

app.delete('/delete', (req: Request, res: Response) => {
    const {name} = req.body;

    const deleteName: object = {
        name
    }

    // deleteItem(deleteName);

    return res.status(201).json({Success: "Deleted list successfully!", deleteName});
})

app.listen(5678);
console.log("Server is running...");