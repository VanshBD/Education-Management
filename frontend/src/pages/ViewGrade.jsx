import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const ViewGrade = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const { data } = await api.get(`/courses/${courseId}/student/grades`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGrade(data);
      } catch (error) {
        setError("Grade not assigned by teacher.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrade();
  }, [courseId]);

  return (
    <div className="p-8 min-h-screen bg-black">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-white">
        Your Course Performance
      </h1>
      <p className="text-lg text-center text-gray-400 mb-8">
        Here's how you've fared in this course. Keep pushing forward!
      </p>
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading your grade...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : grade ? (
        <div className="glass-effect bg-opacity-50 bg-white text-white border border-gray-700 rounded-lg p-8 shadow-lg max-w-md mx-auto transition-shadow hover:shadow-xl">
          <p className="text-2xl font-semibold text-green-500 mb-4 text-center">
            You've earned <span className="font-extrabold">{grade.grade} marks</span>!
          </p>
          <p className="text-lg text-gray-300 text-center">
            Congratulations! Keep up the great work, and aim higher in your future courses.
          </p>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Grade not yet assigned.
        </p>
      )}
    </div>
  );
};

export default ViewGrade;
