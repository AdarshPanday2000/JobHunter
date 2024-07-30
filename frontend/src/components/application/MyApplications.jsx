import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from '../application/ResumeModel';

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  
  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prevApplications) =>
          prevApplications.filter((application) => application._id !== id)
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="bg-gray-100 p-12 min-h-screen">
      {user && user.role === "Job Seeker" ? (
        <div className="container mx-auto flex flex-col gap-9">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-9">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="flex items-center border-b border-gray-300 py-5">
      <div className="detail flex-3 flex flex-col gap-1.5">
        <p>
          <span className="font-bold">Name: </span> {element.name}
        </p>
        <p>
          <span className="font-bold">Email: </span> {element.email}
        </p>
        <p>
          <span className="font-bold">Phone: </span> {element.phone}
        </p>
        <p>
          <span className="font-bold">Address: </span> {element.address}
        </p>
        <p>
          <span className="font-bold">CoverLetter: </span> {element.coverLetter}
        </p>
      </div>
      <div className="flex-1 relative h-64">
        <img
          src={element.resume.url}
          alt="resume"
          className="absolute top-0 left-0 w-auto h-full cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area flex-1 flex items-center justify-center">
        <button
          className="bg-red-600 text-white px-8 py-2.5 text-lg font-medium"
          onClick={() => deleteApplication(element._id)}
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card flex items-center border-b border-gray-300 py-5">
      <div className="detail flex-3 flex flex-col gap-1.5">
        <p>
          <span className="font-bold">Name: </span> {element.name}
        </p>
        <p>
          <span className="font-bold">Email: </span> {element.email}
        </p>
        <p>
          <span className="font-bold">Phone: </span> {element.phone}
        </p>
        <p>
          <span className="font-bold">Address: </span> {element.address}
        </p>
        <p>
          <span className="font-bold">CoverLetter: </span> {element.coverLetter}
        </p>
      </div>
      <div className="flex-1 relative h-64">
        <img
          src={element.resume.url}
          alt="resume"
          className="absolute top-0 left-0 w-auto h-full cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
