import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

//routers
import  reminderrouter from './router/reminderRouter.js';
import  friendrouter from './router/friendsrouter.js';
import  authrouter from './router/authRouter.js';
import errorrouter from './router/error.js';
import { config } from './config.js';


const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan('tiny'));
app.use(helmet());

app.use('/reminders', reminderrouter);
app.use('/friends', friendrouter);
app.use('/auth', authrouter);
app.use(errorrouter);

app.listen(config.host.port, () => {
    console.info(`Listening on http://localhost:${config.host.port} 🤗`);
  });