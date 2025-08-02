import React from "react";

export const Banner = () => {
  return (
    <div
      className=" h-[600px] w-full  bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4">
        <div>
          <p className="text-white bg-gradient-to-r from-red-600 to-white  py-1 px-2 rounded-md">
            TV Shows
          </p>
        </div>
      </div>
    </div>
  );
};
