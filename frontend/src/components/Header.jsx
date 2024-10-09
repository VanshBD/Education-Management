import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaChalkboardTeacher,
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaAngleDown,
  FaAngleUp,
  FaUserGraduate,
  FaTachometerAlt,
} from "react-icons/fa";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to toggle the dropdowns
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-black text-white fixed w-full p-4 flex justify-between items-center shadow-lg z-50">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">EMS Dashboard</h1>
        {user && (
          <p className="ml-6 flex items-center">
            <FaUser className="mr-2" /> Hello, {user.name}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            {/* Dashboard Link */}
            <div>
              <h3 className="font-semibold cursor-pointer flex items-center space-x-2">
                <Link
                  to={
                    user.role === "Admin"
                      ? "/admin"
                      : user.role === "Teacher"
                      ? "/teacher"
                      : "/student"
                  }
                  className="text-gray-300 flex items-center hover:underline"
                >
                  <FaTachometerAlt className="mr-2" /> Dashboard
                </Link>
              </h3>
            </div>

            {/* Admin Dropdown */}
            {user.role === "Admin" && (
              <>
                {/* Manage Teacher Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300"
                    onClick={() => setTeacherDropdownOpen(!teacherDropdownOpen)}
                  >
                    <FaChalkboardTeacher className="mr-2" />
                    Manage Teacher
                    {teacherDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                  {teacherDropdownOpen && (
                    <ul className="absolute mt-2 p-2 bg-gray-900 rounded-lg z-60">
                      <li className="mb-2">
                        <Link
                          to="/create-teacher"
                          className="text-gray-300 hover:underline"
                        >
                          Create Teacher
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/teachers"
                          className="text-gray-300 hover:underline"
                        >
                          See All Teachers
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Manage Course Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300"
                    onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                  >
                    <FaBook className="mr-2" />
                    Manage Course
                    {courseDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                  {courseDropdownOpen && (
                    <ul className="absolute mt-2 p-2 bg-gray-900 rounded-lg z-60">
                      <li className="mb-2">
                        <Link
                          to="/create-course"
                          className="text-gray-300 hover:underline"
                        >
                          Create Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/courses"
                          className="text-gray-300 hover:underline"
                        >
                          All Courses
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Manage Student Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300"
                    onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                  >
                    <FaUserGraduate className="mr-2" />
                    Manage Student
                    {studentDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                  {studentDropdownOpen && (
                    <ul className="absolute mt-2 p-2 bg-gray-900 rounded-lg z-60">
                      <li className="mb-2">
                        <Link
                          to="/students"
                          className="text-gray-300 hover:underline"
                        >
                          All Students
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/enroll-student"
                          className="text-gray-300 hover:underline"
                        >
                          Enroll Student
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}

            {/* Teacher Dropdown */}
            {user.role === "Teacher" && (
              <>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300"
                    onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                  >
                    <FaBook className="mr-2" />
                    Assigned Courses
                    {courseDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                  {courseDropdownOpen && (
                    <ul className="absolute mt-2 p-2 bg-gray-900 rounded-lg z-60">
                      <li className="mb-2">
                        <Link
                          to="/assigned-courses"
                          className="text-gray-300 hover:underline"
                        >
                          View Courses
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}

            {/* Student Dropdown */}
            {user.role === "Student" && (
              <>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300"
                    onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                  >
                    <FaBook className="mr-2" />
                    View All Courses
                    {courseDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                  {courseDropdownOpen && (
                    <ul className="absolute mt-2 p-2 bg-gray-900 rounded-lg z-60">
                      <li className="mb-2">
                        <Link
                          to="/all-courses"
                          className="text-gray-300 hover:underline"
                        >
                          Enroll in Courses
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300"
                    onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                  >
                    <FaUserGraduate className="mr-2" />
                    View Enrolled Courses
                    {studentDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                  {studentDropdownOpen && (
                    <ul className="absolute mt-2 p-2 bg-gray-900 rounded-lg z-60">
                      <li>
                        <Link
                          to="/enrolled-courses"
                          className="text-gray-300 hover:underline"
                        >
                          See Your Enrolled Courses
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-white hover:text-black flex items-center transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </>
        ) : (
          <div className="flex space-x-4">
            {/* Login and Register Links */}
            <Link
              to="/login"
              className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
