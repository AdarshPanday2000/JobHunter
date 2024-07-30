import axios from "axios";
import React, { useContext, useState,useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/postApplication",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },  // important to write this while form submission || application/json is used for text submission
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // if (!isAuthorized || (user && user.role === "Employer")) {
  //   navigateTo("/");
  // }

  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Employer")) {
      navigateTo("/");
    }
  }, []);

  return (
    <section className="application flex flex-col">
      <div className="container mx-auto flex flex-col text-center py-12 px-5">
        <h3 className="text-3xl font-semibold mb-8">Application Form</h3>
        <form onSubmit={handleApplication} className="flex flex-col w-full max-w-lg mx-auto py-10 px-5 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-black py-2 px-1 text-lg focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-black py-2 px-1 text-lg focus:outline-none"
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-b-2 border-black py-2 px-1 text-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-b-2 border-black py-2 px-1 text-lg focus:outline-none"
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full h-40 border-b-2 border-black py-2 px-1 text-lg focus:outline-none"
          />
          <div className="text-left text-lg mb-3">
            <label className="block">Select Resume</label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <button type="submit" className="bg-green-800 text-white py-3 px-5 text-lg hover:bg-green-600 transition-all">
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
