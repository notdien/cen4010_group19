import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

interface New_list {
    name: string;
    description: string;
    reason: string;
    todos: any[];
}

app.use(express.json());
app.post('/create', (req: Request, res: Response) => {
    const { name, description, reason } = req.body;

    const newList: New_list = {
        name,
        description,
        reason,
        todos: []
    }

    res.status(201).json(newList)
});

app.listen(5678);
console.log("Server is running...");