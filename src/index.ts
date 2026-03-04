import express from 'express';

import { db } from './db';
import { cars } from './db/schema';

//new instance
const app = express();
const port = 3000;

const router = express.Router();



//essential middleware function
app.use(express.json());

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

router.get('/', async(req,res)=>{
    const result = await db.select().from(cars);
    res.json(result); 
})







app.use('/api/v1/aramis',router);

app.listen(port, ()=>console.log(`Server is running on http://localhost:${port}`))