import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full flex items-center justify-center">
        <span className="absolute top-9 right-9 text-5xl text-red-600 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" className="max-w-md h-auto" />
      </div>
    </div>
  );
};

export default ResumeModal;
