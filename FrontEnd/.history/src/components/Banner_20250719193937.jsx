import React from "react";

export const Banner = () => {
  return (
    <div
      className="relative h-[600px] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
        <div>
          <p className="text-white bg-gradient-to-r from-red-600 to-white text-black font-semibold py-1 px-2 rounded-md">
            TV Shows
          </p>
          <div className="flex flex-col space-y-4">
            <h2 className="text-white text-3xl">Nghe nói em thích tôi</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">⭐ 9.0</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
