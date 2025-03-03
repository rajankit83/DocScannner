import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS for styling

const App = () => {
  const [page, setPage] = useState("login"); // "login", "register", "dashboard"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      alert("Login successful!");
      setPage("dashboard"); // Navigate to dashboard after login
    } catch (error) {
      alert("Invalid credentials. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert("Registration successful! Please login.");
      setPage("login");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully! Extracted text: " + response.data.extractedText);
    } catch (error) {
      alert("Upload failed.");
    }
  };

  return (
    <div className="container">
      {page === "login" && (
        <div className="box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <button type="submit">Login</button>
            <p onClick={() => setPage("register")}>Register</p>
            <p>Forgot Password?</p>
          </form>
        </div>
      )}

      {page === "register" && (
        <div className="box">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <button type="submit">Register</button>
            <p onClick={() => setPage("login")}>Already have an account? Login</p>
          </form>
        </div>
      )}

      {page === "dashboard" && (
        <div className="dashboard">
          <h1>ScanDc</h1>
          <input type="file" onChange={handleFileUpload} />
        </div>
      )}
    </div>
  );
};

export default App;
