import express from 'express';
import cors from 'cors';



//custom routes
import subjectRouter from './routes/subjects'

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

// router.get('/:id',(req,res)=>{
//     //everything we get from the params are string
//     const id = Number(req.params.id);

//     const car = cars.find((car)=> car.id === id);

//     if(!car){
//         return res.status(404).send('Car not found')
//     }

//     res.json(car)

    
// })

// router.get('/', async(req,res)=>{
//     const result = await db.select().from(departments);
//     res.json(result); 
// })

// router.post('/departments', async (req,res)=>{
//     const {code, name, description} = req.body;
//     if(!code || !name || !description){
//         res.status(400).json({error: "Missing fields"})
//     }

//     const result= await db.insert(departments).values({code,name,description}).returning();

//     res.json(result); 
// })



// router.put('/:id',(req,res)=>{
//   const id = Number(req.params.id);
//   const car = cars.find(car => car.id === id);

//   if (!car) {
//     return res.status(404).send('Car not found');
//   }

//   const allowedFields = ['make', 'model', 'year', 'price'];

//   allowedFields.forEach(field => {
//     if (req.body[field] !== undefined) {
//       car[field] = req.body[field];
//     }
//   });

//   res.json(car);
// })

// router.delete('/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const index = cars.findIndex((car)=>car.id===id);

//     if(index===-1){
//         res.status(404).json({error:"Car not found"})
//     }

//     const deleted = cars.splice(index, 1)[0];
//     res.status(201).json({message:"Car Deleted", details: deleted})
// })





app.use('/api/aramis/subjects',subjectRouter);

app.listen(port, ()=>console.log(`Server is running on http://localhost:${port}`))