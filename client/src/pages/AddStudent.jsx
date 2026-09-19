
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    semester: "",
    course: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.log(error);
        setError("Courses could not be loaded");
      }
    };

    fetchCourses();
  }, []);

  const handleChanges = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!formData.rollNumber.trim()) {
      setError("Roll Number is required");
      return;
    }

    if (!formData.semester.trim()) {
      setError("Semester is required");
      return;
    }

    if (!formData.department.trim()) {
      setError("Department is required");
      return;
    }

    if (!formData.course) {
      setError("Please select a course");
      return;
    }

    try {
      await api.post("/students", formData);

      navigate("/students");
    } catch (error) {
      console.log(error);
      setError("Student could not be added");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Student Management
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Add New Student
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new student record by entering the information below.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
        >

          {/* Card Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-6 md:px-8">
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <span className="text-xl font-bold text-blue-600">
                  +
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Student Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the student's academic details
                </p>
              </div>

            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-8">

            {/* Error Message */}
            {error && (
              <p className="mb-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Name */}
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="name"
              >
                Full Name
              </label>

              <input
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                text-gray-800 outline-none transition
                placeholder:text-gray-400
                hover:border-gray-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                id="name"
                name="name"
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={handleChanges}
              />
            </div>

            {/* Email */}
            <div className="mt-6">
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>

              <input
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                text-gray-800 outline-none transition
                placeholder:text-gray-400
                hover:border-gray-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="email"
                id="email"
                name="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={handleChanges}
              />
            </div>

            {/* Roll Number + Semester */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Roll Number */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-gray-700"
                  htmlFor="roll_no"
                >
                  Roll Number
                </label>

                <input
                  className="w-full rounded-xl border border-gray-300 px-4 py-3
                  text-gray-800 outline-none transition
                  placeholder:text-gray-400
                  hover:border-gray-400
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  type="text"
                  id="roll_no"
                  name="rollNumber"
                  placeholder="e.g. CS-101"
                  value={formData.rollNumber}
                  onChange={handleChanges}
                />
              </div>

              {/* Semester */}
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-gray-700"
                  htmlFor="sem"
                >
                  Semester
                </label>

                <input
                  className="w-full rounded-xl border border-gray-300 px-4 py-3
                  text-gray-800 outline-none transition
                  placeholder:text-gray-400
                  hover:border-gray-400
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  type="number"
                  id="sem"
                  name="semester"
                  min="1"
                  max="8"
                  placeholder="1 - 8"
                  value={formData.semester}
                  onChange={handleChanges}
                />
              </div>

            </div>

            {/* Department */}
            <div className="mt-6">
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="dept"
              >
                Department
              </label>

              <select
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                text-gray-800 outline-none transition
                hover:border-gray-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                id="dept"
                name="department"
                value={formData.department}
                onChange={handleChanges}
              >
                <option value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="SE">Software Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="AI">Artificial Intelligence</option>
              </select>
            </div>

            {/* Course */}
            <div className="mt-6">
              <label
                className="mb-2 block text-sm font-semibold text-gray-700"
                htmlFor="course"
              >
                Course
              </label>

              <select
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3
                text-gray-800 outline-none transition
                hover:border-gray-400
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChanges}
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:justify-end md:px-8">

            <button
              type="button"
              className="rounded-xl border border-gray-300 px-6 py-3
              font-semibold text-gray-700 transition
              hover:bg-gray-100
              active:scale-[0.98]
              cursor-pointer"
              onClick={() => navigate("/students")}
            >
              Cancel
            </button>

            <button
              className="rounded-xl bg-blue-600 px-7 py-3
              font-semibold text-white shadow-md
              transition
              hover:bg-blue-700
              active:scale-[0.98]
              cursor-pointer"
              type="submit"
            >
              Add Student
            </button>

          </div>

        </form>

        {/* Bottom Note */}
        <p className="mt-5 text-center text-sm text-gray-400">
          Make sure the student information is accurate before submitting.
        </p>

      </div>
    </div>
  );
}
