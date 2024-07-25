import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/updateJob/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/deleteJob/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page bg-gray-100 p-12 min-h-[870px]">
        <div className="container mx-auto max-w-[1500px] flex flex-col gap-8 items-center">
          <h1>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <div className="banner flex flex-col gap-5 w-full">
              {myJobs.map((element) => (
                <div className="card flex gap-5 border-b border-gray-900 p-2 w-full" key={element._id}>
                  <div className="content flex gap-5 flex-1">
                    <div className="short_fields flex flex-col gap-5 flex-1">
                      <div className="flex flex-col gap-2">
                        <span>Title:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(element._id, "title", e.target.value)
                          }
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>Country:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.country}
                          onChange={(e) =>
                            handleInputChange(element._id, "country", e.target.value)
                          }
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>City:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(element._id, "city", e.target.value)
                          }
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>Category:</span>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(element._id, "category", e.target.value)
                          }
                          disabled={editingMode !== element._id}
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        >
                          <option value="Graphics & Design">Graphics & Design</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Frontend Web Development">Frontend Web Development</option>
                          <option value="MERN Stack Development">MERN STACK Development</option>
                          <option value="Account & Finance">Account & Finance</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Video Animation">Video Animation</option>
                          <option value="MEAN Stack Development">MEAN STACK Development</option>
                          <option value="MEVN Stack Development">MEVN STACK Development</option>
                          <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>Salary:</span>
                        {element.fixedSalary ? (
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(element._id, "fixedSalary", e.target.value)
                            }
                            className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                          />
                        ) : (
                          <div className="flex gap-5">
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(element._id, "salaryFrom", e.target.value)
                              }
                              className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                            />
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(element._id, "salaryTo", e.target.value)
                              }
                              className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>Expired:</span>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(element._id, "expired", e.target.value)
                          }
                          disabled={editingMode !== element._id}
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>
                    <div className="long_field flex flex-col gap-5 flex-2">
                      <div className="flex flex-col gap-2">
                        <span>Description:</span>
                        <textarea
                          rows={5}
                          value={element.description}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(element._id, "description", e.target.value)
                          }
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>Location:</span>
                        <textarea
                          rows={5}
                          value={element.location}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(element._id, "location", e.target.value)
                          }
                          className={`bg-transparent text-lg p-1 ${editingMode === element._id ? 'border-b border-gray-300' : 'text-gray-500'}`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button_wrapper flex flex-col gap-5 items-center justify-center">
                    <div className="edit_btn_wrapper flex gap-5">
                      {editingMode === element._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(element._id)}
                            className="check_btn bg-transparent text-green-800 border border-green-800 rounded-lg w-12 p-2 flex justify-center items-center text-2xl hover:bg-green-800 hover:text-gray-100 transition-all"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleDisableEdit()}
                            className="cross_btn bg-transparent text-red-600 border border-red-600 rounded-lg w-12 p-2 flex justify-center items-center text-2xl hover:bg-red-600 hover:text-gray-100 transition-all"
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className="edit_btn bg-yellow-500 text-gray-900 text-lg font-medium uppercase p-2 border-none w-28"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="delete_btn bg-red-600 text-gray-100 text-lg font-medium uppercase p-2 border-none w-28"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You've not posted any job or may be you deleted all of your jobs!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
