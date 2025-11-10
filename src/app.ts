import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/error.middleware';
import { router as executeRouter} from './routes/execute.route';

const app = express();

app.use(express.urlencoded({ extended: true }));    
app.use(express.json());

app.use('/api', executeRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Restaurant LLM API is running!'
    });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Route not found'
    })
})

app.use(errorHandler)

export default app;