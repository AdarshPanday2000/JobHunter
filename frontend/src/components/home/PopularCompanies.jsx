import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

function PopularCompanies() {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Banglore,India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10, Silicon Valley",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Delhi, India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-[1500px] mx-auto flex flex-col items-center gap-9 px-6">
        <h3 className="text-3xl font-semibold">TOP COMPANIES</h3>
        <div className="flex flex-wrap justify-between w-full gap-9">
          {companies.map((element) => (
            <div
              key={element.id}
              className="w-[340px] flex flex-col bg-white p-5 gap-3 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl p-2 bg-blue-100 text-green-700 flex items-center justify-center">
                  {element.icon}
                </div>
                <div className="flex flex-col">
                  <p className="font-bold mb-1">{element.title}</p>
                  <p className="text-sm text-gray-500">{element.location}</p>
                </div>
              </div>
              <button className="text-green-700 bg-blue-100 font-bold text-lg border-none py-2 mt-2">
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCompanies;
