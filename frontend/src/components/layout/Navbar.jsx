import React, {useContext, useState} from 'react'
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const [show , setShow] = useState(false);

  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials : true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo('/login')

    } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthorized(true)
    }
  }



  return (
    <nav className={`bg-[#18191c] px-[20px] ${isAuthorized ? "block" : "hidden"}`}>
      <div className="max-w-[1200px] min-w-[1000px] mx-auto flex justify-between">
        <div className="w-[120px] h-[120px]">
          <img className="w-full h-full" src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={`menu ${show ? "fixed top-[120px] left-0 bg-[#f1f3f6] w-[400px] flex flex-col h-full justify-center gap-[30px] items-start pl-[25px] shadow-xl" : "hidden lg:flex lg:gap-[25px] lg:items-center"}`}>
          <li>
            <Link className="text-[#f1f3f6] text-[20px] font-light relative" to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link className="text-[#f1f3f6] text-[20px] font-light relative" to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link className="text-[#f1f3f6] text-[20px] font-light relative" to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link className="text-[#f1f3f6] text-[20px] font-light relative" to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link className="text-[#f1f3f6] text-[20px] font-light relative" to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
          <button className="text-[#f1f3f6] text-[20px] font-light relative py-[7px] border border-[#f1f3f6] bg-transparent hover:bg-[#184235] hover:font-medium transition-all cursor-pointer" onClick={handleLogout}>
            LOGOUT
          </button>
        </ul>
        <div className="lg:hidden text-[#f1f3f6] text-[35px]">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};


export default Navbar