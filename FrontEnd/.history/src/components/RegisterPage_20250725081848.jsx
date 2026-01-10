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
      ></form>
    </div>
  );
}
