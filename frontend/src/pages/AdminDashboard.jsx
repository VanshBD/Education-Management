import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-8 bg-black text-white min-h-screen mt-16">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          Welcome to Our School
        </h1>
        <p className="text-center text-lg text-gray-300 mb-6">
          A place where learning meets innovation.
        </p>
      </div>

      {/* Vision Section with creative enhancements */}
      <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-400">
          Our Vision
        </h2>
        <p className="text-gray-300 text-lg text-justify">
          Our vision is to be a beacon of excellence in education, nurturing
          young minds to become future leaders. We strive to create a nurturing
          environment that fosters curiosity, creativity, and critical thinking.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
