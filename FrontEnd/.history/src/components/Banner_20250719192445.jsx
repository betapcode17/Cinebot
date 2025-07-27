import React from "react";

export const Banner = () => {
  return (
    <div
      className=" h-[600px] w-full  bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4">
        <div> </div>
      </div>
    </div>
  );
};
