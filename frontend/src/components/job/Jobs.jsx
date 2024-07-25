import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { isAutorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/job/getAllJobs', { withCredentials: true })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!isAutorized) {
    navigateTo('/login');
  }

  return (
    <section className="bg-gray-100 min-h-screen p-12">
      <div className="container mx-auto flex flex-col items-center gap-9">
        <h1 className="text-2xl font-bold">ALL AVAILABLE JOBS</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {
            jobs.jobs && jobs.jobs.map((element) => {
              return (
                <div key={element._id} className="bg-white p-5 w-80 h-56 flex flex-col gap-2 justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <p className="text-xl font-bold">{element.title}</p>
                  <p className="text-lg text-gray-500">{element.category}</p>
                  <p className="text-base text-gray-500">{element.country}</p>
                  <Link to={`/job/${element._id}`} className="text-lg text-center text-green-800 bg-blue-100 py-2">Job Details</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
}

export default Jobs;
