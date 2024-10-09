import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "Admin") {
        navigate("/admin");
      } else if (user.role === "Teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold">
        Welcome to the Education Management System
      </h1>
    </div>
  );
};

export default HomePage;
