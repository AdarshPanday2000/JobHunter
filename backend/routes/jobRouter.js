import express from "express";
import { getAllJobs, postJob, getMyJobs,updateJob,deleteJob } from '../controllers/jobController.js';
import { isAuthorized } from '../middlewares/auth.js'

const router = express.Router()


router.get('/getAllJobs' , getAllJobs)
router.get('/getMyJobs', isAuthorized, getMyJobs)
router.post('/postJob', isAuthorized, postJob)
router.put('/updateJob/:id', isAuthorized, updateJob);
router.delete('/deleteJob/:id', isAuthorized, deleteJob)

export default router; 