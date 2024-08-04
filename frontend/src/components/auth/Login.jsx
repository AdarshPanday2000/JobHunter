import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/user/login`,
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="bg-[#2C3333] text-white">
      <section className="flex min-w-full lg:min-w-[1000px] max-w-[1000px] mx-auto min-h-screen">
        <div className="flex-1 flex flex-col justify-center bg-[#2C3333] p-5">
          <div className="flex flex-col gap-4 text-center mb-8">
            <h1 className="text-4xl font-bold ">JobHunter</h1>
            <h3 className="text-2xl font-semibold mt-2">Login to your account</h3>
          </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label>Login As</label>
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
              onClick={handleLogin}
              className="py-3 text-center mt-3 font-bold text-white bg-green-700 text-xl rounded-md">
                Login
            </button>
            <Link
              to={"/register"}
              className="py-3 text-center mt-3 font-bold text-green-700 text-xl border border-green-700 rounded-md">
              Register Now
            </Link>
          </form>
        </div>
        <div className="flex-2 justify-center items-center overflow-hidden hidden lg:flex">
          <img src="/login.png" alt="login" className="w-[550px] h-[550px] " />
        </div>
      </section>
    </div>
  );
};

export default Login;