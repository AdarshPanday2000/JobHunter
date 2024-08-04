import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  //console.log(isAuthorized)
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="bg-[#2C3333] text-white">
      <section className="flex min-w-full lg:min-w-[1000px] max-w-[1000px] mx-auto min-h-screen">
        <div className="flex-1 flex flex-col justify-center bg-[#2C3333] p-5">
          <div className="flex flex-col gap-4 text-center mb-8">
            <h3 className="text-3xl font-semibold mt-2">Create a new account</h3>
          </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label>Register As</label>
              <div className="flex items-center rounded-md text-gray-800">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-gray-300 p-2 w-full h-full focus:outline-none">
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="w-10 text-2xl bg-green-700 h-full p-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <div className="flex items-center rounded-md text-gray-800">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-300 p-2 w-full h-full focus:outline-none"
                />
                <FaPencilAlt className="w-10 text-2xl bg-green-700 h-full p-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email Address</label>
              <div className="flex items-center rounded-md text-gray-800">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-300 p-2 w-full h-full focus:outline-none"
                />
                <MdOutlineMailOutline className="w-10 text-2xl bg-green-700 h-full p-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <div className="flex items-center rounded-md text-gray-800">
                <input
                  type="number"
                  value={phone}
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-300 p-2 w-full h-full focus:outline-none"
                />
                <FaPhoneFlip className="w-10 text-2xl bg-green-700 h-full p-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <div className="flex items-center rounded-md text-gray-800">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-300 p-2 w-full h-full focus:outline-none"
                />
                <RiLock2Fill className="w-10 text-2xl bg-green-700 h-full p-2 text-white" />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleRegister}
              className="py-3 text-center mt-3 font-bold text-white bg-green-700 text-xl rounded-md">
              Register
            </button>
            <Link
              to={"/login"}
              className="py-3 text-center mt-3 font-bold text-green-700 text-xl border border-green-700 rounded-md">
              Login Now
            </Link>
          </form>
        </div>
        <div className="flex-2 justify-center items-center overflow-hidden hidden lg:flex">
          <img src="/register.png" alt="register" className="w-[550px] h-[550px] " />
        </div>
      </section>
    </div>
  );
};

export default Register;
