import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

function HowItWorks() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center py-12 gap-12">
        <h3 className="text-2xl font-bold">How JobHunter Works</h3>
        <div className="flex justify-between gap-6 flex-wrap lg:flex-nowrap">
          <div className="bg-white flex flex-col items-center text-center flex-1 h-[350px] p-8 gap-3 justify-center">
            <FaUserPlus className="text-4xl text-green-700" />
            <p className="text-xl font-semibold">Create Account</p>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora delectus, dignissimos ad ea quas quidem.</p>
          </div>

          <div className="bg-gray-900 text-white flex flex-col items-center text-center flex-1 h-[350px] p-8 gap-3 justify-center">
            <MdFindInPage className="text-4xl text-green-700" />
            <p className="text-xl font-semibold">Find a job/Post a job</p>
            <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora delectus, dignissimos ad ea quas quidem.</p>
          </div>

          <div className="bg-white flex flex-col items-center text-center flex-1 h-[350px] p-8 gap-3 justify-center">
            <IoMdSend className="text-4xl text-green-700" />
            <p className="text-xl font-semibold">Apply For Job/Recruit Suitable Candidates</p>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora delectus, dignissimos ad ea quas quidem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
