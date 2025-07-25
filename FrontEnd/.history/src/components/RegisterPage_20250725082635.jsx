import { useState } from "react";
import bgImg from "../assets/bg-login.jpg";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Cinebot logo góc trái */}
      <div className="absolute top-5 left-6 text-red-600 text-3xl font-extrabold drop-shadow-lg">
        Cinebot
      </div>

      {/* Register Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-black/60 backdrop-blur-md text-white w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <div className="space-y-4">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 transition rounded text-white font-semibold"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
