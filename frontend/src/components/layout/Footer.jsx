import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer
      className={`${
        isAuthorized ? "bg-[#18191c] flex justify-between p-[25px] lg:px-[120px] items-center" : "hidden"
      }`}>
      <div className="flex gap-[12px] text-[16px] text-[#f1f3f6]">
        &copy; All Rights Reserved By Adarsh
      </div>
      <div className="flex gap-[12px] text-[20px] text-[#f1f3f6]">
        <Link
          to={"https://www.facebook.com/profile.php?id=100030535123397"}
          target="_blank"
          className="text-[#f1f3f6] hover:text-[#2d5649] transform transition-all duration-300 hover:scale-125">
          <FaFacebookF />
        </Link>
        <Link
          to={"https://www.youtube.com/@CodeWithZeeshu"}
          target="_blank"
          className="text-[#f1f3f6] hover:text-[#2d5649] transform transition-all duration-300 hover:scale-125">
          <FaYoutube />
        </Link>
        <Link
          to={"https://www.youtube.com/@CodeWithZeeshu"}
          target="_blank"
          className="text-[#f1f3f6] hover:text-[#2d5649] transform transition-all duration-300 hover:scale-125">
          <FaLinkedin />
        </Link>
        <Link
          to={"https://www.instagram.com/z_4_zeeshuuu/"}
          target="_blank"
          className="text-[#f1f3f6] hover:text-[#2d5649] transform transition-all duration-300 hover:scale-125">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
