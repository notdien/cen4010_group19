import { error } from 'console';
import express, { Express, NextFunction, Request, Response } from 'express';
import { addToDo, deleteItem, updateItem, getList, createUser, findUserByUsername, comparePasswords } from './db'
import { secret_key } from './keys';

// const session = require('express-session'); 
import session, { Session } from 'express-session';
const app: Express = express();

app.use(express.json());
app.use(
    session({
        secret: secret_key,
        resave: true,
        saveUninitialized: true
    })
)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// basic commands

// creates a new to-do and adds to the DB
interface new_todo {
    name: string;
    description: string;
    creation_date: string;
}
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

// deletes a to-do from the DB
app.delete('/to-do/:name', async (req: Request, res: Response) => {
    var name = req.params.name;

    var results = deleteItem({name});
    return res.status(200).send(results)
})

// gets all the to-dos
app.get('/to-do', async (req: Request, res: Response) => {
    var results = await getList();
    return res.status(200).send(results);

})

interface new_changes {
    description: string,
    creation_date: string
}

// updates a to-do's description and creation date
app.put('/to-do/:name', async (req: Request, res: Response) => {
    var name = req.params.name;
    const { description, creation_date } = req.body;

    const newChanges: new_changes = {
        description,
        creation_date
    }

    updateItem({name}, newChanges)
    return res.status(200).send(newChanges);

})

// user login
// this signs up a user 
app.post('/signup', async (req: Request, res: Response) => {

    const { username, password } = req.body
    
    // if it exists - doesn't create user
     const existingUser = await findUserByUsername(username);
     if (existingUser) {
        return res.status(400).json({ Message: 'Username already exists!', existingUser })
     }

     const newUser = await createUser(username, password)
     res.status(201).json({ Message: 'New user created successfully!' })
})

// user login
app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // if the user exist does not exist - no login
    const existingUser = await findUserByUsername(username);
    if (!existingUser) {
        return res.status(404).json({ Message: "User does not exist!" })
    }

    // if the password is incorrect - no login
    const validPassword = await comparePasswords(password, existingUser.password);
    if (!validPassword) {
        return res.status(401).json({ Message: "Password is incorrect, please check your username/password again "});
    }

    // other wise - login
    res.json({ Message: 'Login successful!' });

})

app.listen(5678);
console.log("Server is running...");