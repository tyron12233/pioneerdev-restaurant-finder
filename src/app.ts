import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

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