import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(username, password);
      if (response.data.success) {
        // Handle successful login
        console.log("Login successful:", response.data);
      } else {
        // Handle login failure
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return;
}
