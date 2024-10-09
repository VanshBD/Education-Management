import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Fetch all teachers for selection
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await api.get("/users/teachers");
      setTeachers(response.data);
    };
    fetchTeachers();
  }, []);

  // Validation functions
  const validateForm = () => {
    let errors = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
    if (!startDate) errors.startDate = "Start Date is required.";
    if (!endDate) errors.endDate = "End Date is required.";
    if (!teacher) errors.teacher = "Please select a teacher.";
    return errors;
  };

  // Handle form submission
  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await api.post("/courses", {
        title,
        description,
        startDate,
        endDate,
        teacher,
      });
      setSuccess("Course created successfully");
      setError(null);
      navigate("/courses"); // Redirect to course list
    } catch (err) {
      setError("Failed to create course");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-black justify-center items-center  from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create New Course
        </h2>

        {/* Display error or success message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <form onSubmit={handleCreateCourse}>
          {/* Title input */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter course title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setValidationErrors((prev) => ({ ...prev, title: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.title ? "border-red-500" : "border-gray-300"
              } rounded mt-2`}
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.title}
              </p>
            )}
          </div>

          {/* Description input */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              placeholder="Enter course description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setValidationErrors((prev) => ({ ...prev, description: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.description
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded mt-2`}
            />
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.description}
              </p>
            )}
          </div>

          {/* Start Date input */}
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setValidationErrors((prev) => ({ ...prev, startDate: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded mt-2`}
            />
            {validationErrors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.startDate}
              </p>
            )}
          </div>

          {/* End Date input */}
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setValidationErrors((prev) => ({ ...prev, endDate: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.endDate ? "border-red-500" : "border-gray-300"
              } rounded mt-2`}
            />
            {validationErrors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.endDate}
              </p>
            )}
          </div>

          {/* Teacher selection */}
          <div className="mb-4">
            <label className="block text-gray-700">Teacher</label>
            <select
              value={teacher}
              onChange={(e) => {
                setTeacher(e.target.value);
                setValidationErrors((prev) => ({ ...prev, teacher: "" }));
              }}
              className={`w-full p-2 border ${
                validationErrors.teacher ? "border-red-500" : "border-gray-300"
              } rounded mt-2`}
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            {validationErrors.teacher && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.teacher}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
