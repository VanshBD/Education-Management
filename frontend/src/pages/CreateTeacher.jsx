import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Form validation state
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Function to handle form submission
  const handleCreateTeacher = async (e) => {
    e.preventDefault();

    // Basic validation checks
    if (!name) {
      setValidationErrors((prev) => ({ ...prev, name: "Name is required." }));
      return;
    }

    if (!validateEmail(email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Invalid email format.",
      }));
      return;
    }

    if (password.length < 3) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password must be at least 3 characters long.",
      }));
      return;
    }

    try {
      await api.post("/users/create-teacher", { name, email, password });
      setSuccess("Teacher created successfully");
      setError(null);
      navigate("/teachers"); // Redirect to the list of teachers
    } catch (err) {
      setError("Failed to create teacher");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black p-4">
      <div
        className="backdrop-filter backdrop-blur-lg bg-opacity-20 bg-white p-8 rounded-lg shadow-lg w-96 relative z-0"
        style={{ backdropFilter: "blur(10px)" }} // For Glass Effect
      >
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Create Teacher
        </h2>

        {/* Show success or error messages */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleCreateTeacher}>
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              placeholder="Enter teacher's name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setValidationErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.name ? "border-red-500" : "border-gray-300"
              } rounded mt-2 bg-gray-900 text-white transition-transform transform hover:scale-105`}
              required
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              placeholder="Enter teacher's email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.email ? "border-red-500" : "border-gray-300"
              } rounded mt-2 bg-gray-900 text-white transition-transform transform hover:scale-105`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              placeholder="Enter password (min 6 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors((prev) => ({ ...prev, password: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.password ? "border-red-500" : "border-gray-300"
              } rounded mt-2 bg-gray-900 text-white transition-transform transform hover:scale-105`}
              required
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            Create Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;
