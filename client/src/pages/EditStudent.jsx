import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    semester: ""
  });

  useEffect(() => {
    async function fetchStudent() {
      try {
        const request = await api.get(`/students/${id}`);

        console.log(request.data);

        setFormData(request.data.student);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await api.put(`/students/${id}`, formData);
      console.log(request.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Student Management
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Edit Student
          </h1>

          <p className="text-gray-500 mt-2">
            Update the student's information and save your changes.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
        >

          {/* Card Header */}
          <div className="px-6 md:px-8 py-6 border-b border-gray-200 bg-gray-50">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">
                  ✎
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Student Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Modify the details below
                </p>
              </div>

            </div>

          </div>

          {/* Form Body */}
          <div className="p-6 md:p-8">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                  text-gray-800 outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-gray-400 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                  text-gray-800 outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-gray-400 transition"
                />
              </div>

            </div>

            {/* Roll Number + Semester */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              {/* Roll Number */}
              <div>
                <label
                  htmlFor="roll_no"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Roll Number
                </label>

                <input
                  type="text"
                  id="roll_no"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="e.g. CS-101"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                  text-gray-800 outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-gray-400 transition"
                />
              </div>

              {/* Semester */}
              <div>
                <label
                  htmlFor="sem"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Semester
                </label>

                <input
                  type="number"
                  id="sem"
                  name="semester"
                  min="1"
                  max="8"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="1 - 8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                  text-gray-800 outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-gray-400 transition"
                />
              </div>

            </div>

            {/* Department */}
            <div className="mt-6">

              <label
                htmlFor="dept"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Department
              </label>

              <select
                id="dept"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                bg-white text-gray-800 outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                hover:border-gray-400 transition"
              >
                <option value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="SE">Software Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="AI">Artificial Intelligence</option>
              </select>

            </div>

          </div>

          {/* Footer / Buttons */}
          <div className="px-6 md:px-8 py-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:justify-end">

            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-gray-300
              text-gray-700 font-semibold
              hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl
              bg-blue-600 text-white font-semibold
              shadow-md
              hover:bg-blue-700
              active:scale-[0.98]
              transition cursor-pointer"
            >
              Save Changes
            </button>

          </div>

        </form>

        {/* Bottom Note */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Make sure all student information is correct before saving.
        </p>

      </div>

    </div>
  );
}