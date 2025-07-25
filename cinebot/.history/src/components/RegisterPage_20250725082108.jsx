import { useState } from "react";
import bgImg from "../assets/bg-login.jpg";
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
      className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute top-5 left-5 text-red-500 text-2xl font-bold">
        Cinebot
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-black/50 p-8 rounded-2xl shadow-lg w-[90%] max-w-md backdrop-blur-md text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
        >
          Register
        </button>
        <div className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Sign in now
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
