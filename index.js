import dotenv from 'dotenv'
dotenv.config()
 
import express, { Router } from 'express'
import connectDB from './database/dbconnection.js';
const app = express()
import session from 'express-session'
const port = process.env.port || 6000
import cors from 'cors'
import router from './routes/route.js'
import jobsRoute from './routes/jobsRoute.js';

app.use(session({
  secret: "your_secret_key",
  resave: false,    
  saveUninitialized: false,
  cookie: {
    secure: false, // true in production (https)
    httpOnly: true
  } 
}));


connectDB()
app.use(express.json()) 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use('/api',router)
app.use('/api',jobsRoute)

app.listen(port ,()=>console.log(`server running on http://localhost:${port}`));


