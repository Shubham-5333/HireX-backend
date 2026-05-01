import express from 'express'
import { createJobs,findJob,applyJob, getAppliedJobs } from '../controller/jobs.js'
const jobsRoute = express.Router()


jobsRoute.post('/jobPosting',createJobs)
jobsRoute.get('/findJob',findJob)
jobsRoute.post('/applyJob',applyJob)
jobsRoute.get('/appliedJobs',getAppliedJobs)
// jobsRoute.get('/appliedJobs')

export default jobsRoute