// src/pages/LoginPage.jsx
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <input
          type="text"
          placeholder="Email hoặc số điện thoại"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
