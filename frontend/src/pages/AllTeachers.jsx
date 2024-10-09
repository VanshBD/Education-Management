import React, { useEffect, useState } from "react";
import api from "../api/api";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/users/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers");
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 mt-15 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        All Teachers
      </h2>
      <div
        className="overflow-x-auto shadow-lg rounded-lg backdrop-blur-md bg-black bg-opacity-40 p-4 max-w-6xl mx-auto"
        style={{ backdropFilter: "blur(10px)" }} // Glass effect
      >
        <table className="min-w-full text-sm text-left text-white">
          <thead className="text-xs text-gray-200 uppercase bg-black border border-gray-600 bg-opacity-50">
            <tr>
              <th className="px-6 py-3 border border-gray-600">#</th>
              <th className="px-6 py-3 border border-gray-600">Name</th>
              <th className="px-6 py-3 border border-gray-600">Email</th>
              <th className="px-6 py-3 border border-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`${
                  index % 2 === 0 ? "bg-black bg-opacity-20" : "bg-black bg-opacity-10"
                } hover:bg-white hover:bg-opacity-10 transition duration-300`}
              >
                <td className="px-6 py-4 border border-gray-600 text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border border-gray-600 font-medium text-gray-300">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 border border-gray-600 text-gray-400">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 border border-gray-600 text-green-500">
                  Teacher
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeachers;
