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
      className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-4 right-8 text-white text-3xl font-bold drop-shadow-lg">
        Cinebot
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-black/50 p-8 rounded-2xl shadow-lg w-[90%] max-w-md backdrop-blur-md text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <input
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
        >
          Sign In
        </button>

        <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-red-500" />
            <span>Remember me</span>
          </label>
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div>

        <div className="mt-6 text-center text-sm">
          <a href="#" className="text-blue-400 hover:underline">
            Sign in with Facebook
          </a>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          New to Netflix?{" "}
          <a href="#" className="text-white hover:underline">
            Sign up now
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
