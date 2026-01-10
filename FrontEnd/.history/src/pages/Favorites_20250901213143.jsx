import React from "react";

const Favorites = () => {
  return (
    <div className="mt-20">
      {" "}
      {/* tăng margin-top */}
      <h1 className="text-2xl font-bold">My Favorites</h1>
      <p className="text-gray-600">This is the favorites page.</p>
      <table className="border border-white">
        <thead className="">
          <tr>
            <th className="py-3 px-4 border-b text-left">Poster</th>
            <th className="py-3 px-4 border-b text-left">Title</th>
            <th className="py-3 px-4 border-b text-left">Gender</th>
            <th className="py-3 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Favorites;
