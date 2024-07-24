import React from 'react';
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from 'react-icons/fa';

function HeroSection() {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row items-center mx-auto max-w-[1200px] mb-7">
        <div className="flex flex-col justify-center text-center lg:text-left lg:w-1/2">
          <h1 className="text-3xl font-bold">Find a job that suits</h1>
          <h1 className="text-3xl font-bold">your interest and skills</h1>
          <p className="mt-6 max-w-[600px] mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet et dolores, excepturi praesentium fuga quis modi maxime quaerat accusantium esse suscipit doloremque ve.
          </p>
        </div>
        <div className="lg:w-1/2 relative mt-6 lg:mt-0">
          <img src="/heroS.jpg" alt="hero" className="w-full h-[450px] object-cover" />
        </div>
      </div>

      <div className="flex flex-wrap justify-between mx-auto max-w-[1500px] gap-6 mb-10">
        {details.map((element) => (
          <div key={element.id} className="flex items-center gap-5 bg-gray-100 p-5 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="text-3xl bg-blue-100 p-2 rounded-full text-blue-600">
              {element.icon}
            </div>
            <div>
              <p className="font-bold">{element.title}</p>
              <p className="text-gray-500">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
