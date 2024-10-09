import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/users/students");
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading students...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Students
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={student._id}
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="p-6 flex-grow">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {student.name}
              </h3>
              <p className="text-gray-600 mb-4">{student.email}</p>
              <p className="text-sm text-green-600 mb-2">
                <strong>Role:</strong> {student.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
