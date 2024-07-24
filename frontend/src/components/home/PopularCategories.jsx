import React from "react";
import { MdOutlineDesignServices, MdOutlineWebhook, MdAccountBalance, MdOutlineAnimation } from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

function PopularCategories() {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-9 px-6">
        <h3 className="text-center text-3xl font-semibold">POPULAR CATEGORIES</h3>
        <div className="flex flex-wrap justify-between gap-9">
          {categories.map((element) => (
            <div
              key={element.id}
              className="w-[250px] bg-gray-100 p-5 flex items-center gap-3 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-2xl p-2 bg-blue-100 text-green-700 flex items-center justify-center">
                {element.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold">{element.title}</p>
                <p className="text-sm text-gray-500">{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
