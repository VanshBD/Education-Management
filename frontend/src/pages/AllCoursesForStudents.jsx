import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const AllCoursesForStudents = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses"); // Fetch all courses
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await api.get("/courses/student/enrolled");
        setEnrolledCourses(response.data.map((course) => course._id)); // Ensure the data is mapped correctly
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("No courses enrolled yet");
        } else {
          console.error("Failed to fetch enrolled courses", error);
        }
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
    setLoading(false);
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`); // Enroll student in the course
      setEnrolledCourses([...enrolledCourses, courseId]); // Add course to the enrolled list
      alert("You have successfully enrolled in the course.");
    } catch (error) {
      console.error("Failed to enroll in course", error);
      alert("Failed to enroll in the course.");
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading courses...</p>;
  }

  return (
    <div className="p-8 min-h-screen bg-black">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">
        All Available Courses
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {courses.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            No courses available.
          </p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="glass-effect bg-opacity-40 bg-white text-white border border-gray-500 rounded-lg p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
              <p className="text-gray-300 mb-2">
                Description: {course.description}
              </p>
              <p className="text-sm text-gray-400">
                Start Date: {new Date(course.startDate).toLocaleDateString()} - 
                End Date: {new Date(course.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-400">
                Teacher: {course.teacher?.name || "Unknown"}
              </p>

              <div className="mt-4">
                {enrolledCourses.includes(course._id) ? (
                  <button
                    disabled
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Already Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllCoursesForStudents;
