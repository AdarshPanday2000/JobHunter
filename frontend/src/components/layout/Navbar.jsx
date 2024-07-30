import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
     toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={`bg-gray-800 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto flex justify-between items-center max-w-[1200px] min-w-[1000px]">
        <div className="w-[120px] h-[120px]">
          <img src="/JobZee-logos__white.png" alt="logo" className="w-full h-full" />
        </div>
        <ul className={`flex gap-6 items-center ${!show ? "flex" : "hidden"} md:flex md:static md:w-auto md:bg-transparent md:shadow-none`}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)} className="text-gray-200 text-xl font-light relative hover:text-green-500 transition-all duration-300">HOME</Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)} className="text-gray-200 text-xl font-light relative hover:text-green-500 transition-all duration-300">ALL JOBS</Link>
          </li>
          <li>
            <Link to={"/application/me"} onClick={() => setShow(false)} className="text-gray-200 text-xl font-light relative hover:text-green-500 transition-all duration-300">
              {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)} className="text-gray-200 text-xl font-light relative hover:text-green-500 transition-all duration-300">POST NEW JOB</Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)} className="text-gray-200 text-xl font-light relative hover:text-green-500 transition-all duration-300">VIEW YOUR JOBS</Link>
              </li>
            </>
          )}
          <button onClick={handleLogout} className="h-auto px-4 py-2 border border-gray-200 text-gray-200 bg-transparent text-xl font-light hover:bg-green-800 transition-all duration-300 cursor-pointer">LOGOUT</button>
        </ul>
        <div className="hamburger md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} className="text-3xl text-gray-200" />
        </div>
      </div>
    </nav>  
  );
};

export default Navbar;
