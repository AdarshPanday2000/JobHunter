import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { Job } from '../models/jobSchema.js'

export const getAllJobs = catchAsyncError(async(req,res,next) => {
    const jobs = await Job.find({ expired : false })

    res.status(200).json({
        success : true,
        jobs
    })
})


export const postJob = catchAsyncError(async(req,res,next) => {
    const { role } = req.user;
    if(role === 'Job Seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resource', 400))
    }

    const { title, description, category, country, city, location, fixedSalary, salaryfrom, salaryTo } = req.body;

    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler('Please provide full job detail', 400))
    }

    if((!salaryfrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler('Please either provide fixed salary or ranged salary'))
    }

    if(salaryfrom && salaryTo && fixedSalary){
        return next(new ErrorHandler('Cannot enter fixed salary and ranged salary together'))
    }

    const postedBy = req.user._id;
    const job = await Job.create({ postedBy , title, description, category, country, city, location, fixedSalary, salaryfrom, salaryTo });

    res.status(200).json({
        success : true,
        message : 'Job posted successfully',
        job,
    })
})


export const getMyJobs = catchAsyncError(async(req,res,next) => {
    const { role } = req.user;
    if(role === 'Job Seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resource', 400))
    }
    const myJobs = await Job.find({ postedBy : req.user._id })
    res.status(200).json({
        success : true,
        myJobs,
    })
})


export const updateJob = catchAsyncError(async(req,res,next) => {
    const { role } = req.user;
    if(role === 'Job Seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resource', 400))
    }

    const { id } = req.params  // get id from params 
    let job = await Job.findById({ id });
    if(!job){
        return next(new ErrorHandler('Oops, Job not found', 404))
    }

    //job mil gyi toh
    job = await Job.findByIdAndUpdate(id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })
    res.status(200).json({
        success : true,
        job,
        message: 'Job updated successfully'
    })
})


export const deleteJob = catchAsyncError(async(req,res,next) => {
    const { role } = req.user;
    if(role === 'Job Seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resource', 400))
    }

    const { id } = req.params  
    let job = await Job.findById({ id });
    if(!job){
        return next(new ErrorHandler('Oops, Job not found', 404))
    }

    //deleting
    await Job.deleteOne();
    res.status(200).json({
        success : true,
        message : 'Job deleted successfully'
    })
});
