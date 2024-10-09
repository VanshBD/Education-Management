import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from AuthContext
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch enrolled courses for the student
  const fetchEnrolledCourses = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/courses/student/enrolled", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses(data);
    } catch (error) {
      setError("Not yet enrolled in any course.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses(); // Fetch courses on initial load
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Your Enrolled Courses
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-lg text-gray-400">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-transparent text-black border border-gray-700 rounded-lg p-6 shadow-lg transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500">
                Start Date: {new Date(course.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                End Date: {new Date(course.endDate).toLocaleDateString()}
              </p>

              {/* View Grade Button */}
              <div className="mt-4">
                <Link
                  to={`/course/${course._id}/grades`}
                  className="bg-white border border-black text-black py-2 px-4 rounded hover:bg-black hover:text-white transition-colors duration-300"
                >
                  View Grade
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
