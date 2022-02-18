// import express, {Request, Response} from 'express';
// const app = express();
//
// app.get('/hello', (req: Request, res: Response) =>
//     res.send('Hello World!'));
//
// app.get('/add/:a/:b', (req: Request, res: Response) =>
//     res.send(req.params.a + req.params.b));
//
// const PORT = 4000;
// app.listen(process.env.PORT || PORT);

/**
 * @file Server file
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";

import mongoose from "mongoose";

// connect to the database
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://tuit:tuit@cluster0.ldao1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

// create RESTful Web service API
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);