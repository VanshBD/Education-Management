import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate to course details page
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const ViewAssignCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        const response = await api.get("/courses/teacher/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch assigned courses.");
        setLoading(false);
      }
    };

    fetchAssignedCourses();
  }, []);

  const toggleDetails = (index) => {
    const updatedCourses = courses.map((course, i) =>
      i === index ? { ...course, showMore: !course.showMore } : course
    );
    setCourses(updatedCourses);
  };

  if (loading) return <p className="text-white mt-10">Loading assigned courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white">Assigned Courses</h1>
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course, index) => (
          <div
            key={course._id}
            className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white">{course.title}</h2>
            <p className="text-gray-300 mb-2">{course.description}</p>
            <p className="text-sm text-gray-400">
              Start Date: {new Date(course.startDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400">
              End Date: {new Date(course.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-300">
              <strong>Enrolled Students:</strong> {course.students.length}
            </p>
            {/* Show More / Show Less toggle */}
            {course.showMore && (
              <div className="mt-2 text-gray-300">
                <p><strong>Student List:</strong></p>
                <ul className="list-disc list-inside">
                  {course.students.map((student, i) => (
                    <li key={i}>{student.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => toggleDetails(index)}
              className="mt-4 inline-block bg-gray-700 text-white py-2 mx-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              {course.showMore ? "Show Less" : "Show More"}
            </button>
            {/* Add See Details button */}
            <Link
              to={`/courses/${course._id}`} // Pass course ID in the URL
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAssignCourse; 