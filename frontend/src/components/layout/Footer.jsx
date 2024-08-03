import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer
      className={`${
        isAuthorized ? "bg-[#18191c] flex justify-between p-[25px] lg:px-[120px] items-center" : "hidden"
      }`}>
      <div className="flex gap-[12px] text-[16px] text-[#f1f3f6]">
        &copy; Made by Adarsh
      </div>
      <div className="flex gap-[12px] text-[20px] text-[#f1f3f6]">
        <Link
          to={"https://www.linkedin.com/in/adarshpandey1"}
          target="_blank"
          className="text-[#f1f3f6] hover:text-[#2d5649] transform transition-all duration-300 hover:scale-125">
          <FaLinkedin />
        </Link>
        <Link
          to={"https://github.com/AdarshPanday2000"}
          target="_blank"
          className="text-[#f1f3f6] hover:text-[#2d5649] transform transition-all duration-300 hover:scale-125">
          <FiGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
