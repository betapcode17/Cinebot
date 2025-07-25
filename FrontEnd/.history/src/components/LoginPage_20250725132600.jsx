import { useState } from "react";
import bgImage from "../assets/bg-login.jpg"; // Đảm bảo path đúng
import { loginApi } from "../service/UserService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await loginApi(email, password);
      if (res.status === 200) {
        alert("Login successful!");
        // TODO: chuyển hướng hoặc lưu token
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-8 text-red-500 text-3xl font-bold drop-shadow-lg">
        Cinebot
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-black/50 p-8 rounded-2xl shadow-lg w-[90%] max-w-md backdrop-blur-md text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <label htmlFor="email" className="text-sm">
          Email or phone number
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
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

        <div className="mt-4 text-center text-sm text-gray-400">
          New to Netflix?{" "}
          <a href="/signup" className="text-white hover:underline">
            Sign up now
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
