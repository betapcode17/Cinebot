import React from "react";

export const Banner = () => {
  return (
    <div
      className=" h-[600px] w-full  bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};
