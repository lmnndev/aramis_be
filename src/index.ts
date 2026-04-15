import AgentAPI from 'apminsight';
AgentAPI.config();


import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js'

//custom routes
import subjectRouter from './routes/subjects.js'
import userRouter from './routes/user.js'
import classesRouter from './routes/classes.js'
import aiRouter from './routes/ai/class-insights.js'
//ARCJET
import securityMiddleware from './middleware/security.js';

//new instance
const app = express();
const port = 3000;

//check frontend url exists
if(!process.env.FRONTEND_URL)
    throw new Error('Frontend URL is not set on the environment file');

//cors setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

//better-auth mount handler
app.all("/api/auth/*splat", toNodeHandler(auth));


//essential middleware function
app.use(express.json());

//security middleware: Arcjet
app.use(securityMiddleware)

//middleware
//simply logsout
app.use((req,res,next)=> {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    next();
})


app.get('/', (req, res) => {
    res.send('Hello from the CARS API')
})


app.use('/api/subjects',subjectRouter);
app.use('/api/users',userRouter);
app.use('/api/classes', classesRouter);
app.use('/api/ai', aiRouter);

app.listen(port, ()=>console.log(`Server is running on http://localhost:${port}`))