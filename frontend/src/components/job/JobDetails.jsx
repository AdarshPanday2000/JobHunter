import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams(); // coming from app.jsx jobs params, we have named id there
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized,user } = useContext(Context);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then(res => {
        setJob(res.data.job);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [id]);


  if (!isAuthorized) {
    navigateTo('/login');
  }

  return (
    <div className="bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h3 className="text-2xl font-bold">Job Details</h3>
        <div className="w-full min-h-[500px] flex flex-col gap-6 justify-center mt-5 pl-12 pb-12">
          <p className="font-bold text-green-800">
            Title: <span className="font-normal text-black">{job.title}</span>
          </p>
          <p className="font-bold text-green-800">
            Category: <span className="font-normal text-black">{job.category}</span>
          </p>
          <p className="font-bold text-green-800">
            Country: <span className="font-normal text-black">{job.country}</span>
          </p>
          <p className="font-bold text-green-800">
            City: <span className="font-normal text-black">{job.city}</span>
          </p>
          <p className="font-bold text-green-800">
            Location: <span className="font-normal text-black">{job.location}</span>
          </p>
          <p className="font-bold text-green-800">
            Description: <span className="font-normal text-black">{job.description}</span>
          </p>
          <p className="font-bold text-green-800">
            Job Posted On: <span className="font-normal text-black">{job.jobPostedOn}</span>
          </p>
          <p className="font-bold text-green-800">
            Salary: {job.fixedSalary ? (<span className="font-normal text-black">{job.fixedSalary}</span>) : (<span className="font-normal text-black">{job.salaryForm} - {job.salaryTo}</span>)}
          </p>
          <p>
            {user && user.role === 'Employer' ? null : <Link to={`/application/${job._id}`} className="bg-green-800 text-blue-100 text-lg font-normal py-3 px-8 mt-2 inline-block">Apply Now</Link>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
