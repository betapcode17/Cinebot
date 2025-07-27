import { useState } from "react";
import bgImage from "../assets/bg-login.jpg"; // điều chỉnh đúng path nếu ảnh nằm nơi khác
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div
      className="min-h-screen bg-gray-900 flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        <input
          type="text"
          placeholder="Email hoặc số điện thoại"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
        >
          Đăng nhập
        </button>

        <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-red-500" />
            <span>Ghi nhớ tôi</span>
          </label>
          <a href="#" className="hover:underline">
            Bạn cần trợ giúp?
          </a>
        </div>

        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-blue-400 hover:underline">
            Đăng nhập bằng tài khoản Facebook
          </a>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          Bạn mới tham gia Netflix?{" "}
          <a href="#" className="text-white hover:underline">
            Đăng ký ngay
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
