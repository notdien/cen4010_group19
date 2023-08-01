import { error } from 'console';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { getList, createUser, findUserByUsername, comparePasswords, add_Todo, get_Todo, delete_Todo } from './db'
import { uri_key } from './keys';


// const session = require('express-session'); 
import session, { Session } from 'express-session';
const app: Express = express();

app.use(express.json());
app.use(
    session({
        secret: uri_key,
        resave: false,
        saveUninitialized: true
    }),
    cors({
        origin: 'http://localhost:19006'  // replace with your actual origin
        // origin: 'http://localhost:5000'
      })
)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

// basic commands

// gets all the to-dos
app.get('/to-do', async (req: Request, res: Response) => {
    var results = await getList();
    return res.status(200).send(results);
})

interface new_changes {
    description: string,
    creation_date: string
}



// user login
// this signs up a user 
app.post('/signup', async (req: Request, res: Response) => {

    const { username, password } = req.body
    const to_dos = []
    
    // if it exists - doesn't create user
     const existingUser = await findUserByUsername(username);
     if (existingUser) {
        return res.status(400).json({ Message: 'Username already exists!', existingUser })
     }

     const user = {
        username,
        password,
        to_dos: []
     }

     const newUser = await createUser(user)
     res.status(201).json({ Message: 'New user created successfully!' })
})

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string] : any};
    }
}

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
        return res.status(401).json({ Message: "Password is incorrect, please check your username/password again"});
    }

    // other wise - login
    req.session.user = existingUser._id;
    res.json({ Message: 'Login successful!' });

})

// log out
// does not need database connection
// the express-session middleware handles the session data management
app.post('/logout', async (req: Request, res: Response) => {
    // destroys the user's session to log them out
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destorying session:', err);
            return res.status(500).json({ Message: 'An error has occured while attempting to log out...' });
        }

        // if no errors - log out the user
        res.json({ Message: 'Logout successful!' });
    })
})

//interface
interface new_todo {
    name: string;
    description: string;
    creation_date: string;
}

app.post('/create/:username', async (req: Request, res: Response) => {
    var username = req.params.username;

    const { name, description, creation_date } = req.body;

    const todo: new_todo = {
        name,
        description,
        creation_date
    }

    add_Todo(username, todo);
    return res.status(201).json({Success: "Created new To-do Successfully! Added", todo});

})

// seeing just the user to dos
app.get('/read/:username', async (req: Request, res: Response) => {
    var username = req.params.username;

    var results = await get_Todo(username);
    return res.status(200).send(results);
})

// delete a to-do
app.post('/delete/:username', async (req: Request, res: Response) => {
    var username = req.params.username;

    const {name} = req.body;

    delete_Todo(username, name)
    return res.status(201).json({Success: "Delete that to-do!"})
})

// app.listen(5678);
// console.log("Server is running...");
const port = 5678;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})