import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

/**
 * Backend
 */
app.use('/api/', routes);

/**
 * Frontend
 */
app.use('/', express.static(resolve(__dirname, 'views')));

export default app;
