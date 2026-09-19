
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Student() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch students
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await api.get("/students");
        setStudent(response.data);
      } catch (error) {
        console.log("API ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/students/${id}`);

      console.log(response.data);

      setStudent((prevStudents) =>
        prevStudents.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-2">

              <div className="h-2 w-2 rounded-full bg-blue-600"></div>

              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Student Management
              </p>

            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Students
            </h1>

            <p className="text-slate-500 mt-2">
              Manage student records, courses and academic information.
            </p>
          </div>


          {/* Add Student */}
          <button
            onClick={() => navigate("/students/add")}
            className="inline-flex items-center justify-center gap-2
            bg-blue-600 text-white px-6 py-3 rounded-xl
            font-semibold shadow-lg shadow-blue-600/20
            hover:bg-blue-700 transition
            active:scale-95 cursor-pointer"
          >
            <span className="text-xl leading-none">+</span>
            Add Student
          </button>

        </div>


        {/* ================= STATISTICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* Total Students */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Students
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {student.length}
                </h2>

              </div>

              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-xl">👨‍🎓</span>
              </div>

            </div>

          </div>


          {/* Enrolled Students */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Enrolled Students
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {student.filter((item) => item.course).length}
                </h2>

              </div>

              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>

            </div>

          </div>


          {/* Active Semester */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Active Semester
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  7th
                </h2>

              </div>

              <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>

            </div>

          </div>

        </div>


        {/* ================= STUDENT SECTION ================= */}
        <div className="mb-6">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Student Records
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View and manage all registered students.
              </p>

            </div>

            <span className="text-sm font-semibold text-slate-500">
              {student.length} Students
            </span>

          </div>

        </div>


        {/* ================= LOADING ================= */}
        {loading ? (

          <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">

            <div className="inline-block h-8 w-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>

            <p className="text-sm text-slate-500 mt-4">
              Loading students...
            </p>

          </div>

        ) : student.length === 0 ? (

          /* ================= EMPTY STATE ================= */
          <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center px-6">

            <div className="h-16 w-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">

              <span className="text-2xl">
                👨‍🎓
              </span>

            </div>

            <h3 className="text-lg font-bold text-slate-800">
              No students found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Add your first student to start managing records.
            </p>

            <button
              onClick={() => navigate("/students/add")}
              className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg
              font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              + Add Student
            </button>

          </div>

        ) : (

          /* ================= STUDENT CARDS ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {student.map((item) => (

              <div
                key={item._id}
                className="bg-white border border-slate-200 rounded-2xl
                shadow-sm hover:shadow-lg hover:-translate-y-1
                transition duration-200 overflow-hidden"
              >

                {/* Card Top */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    {/* Avatar + Name */}
                    <div className="flex items-center gap-4">

                      <div className="h-14 w-14 rounded-2xl bg-blue-50
                      flex items-center justify-center flex-shrink-0">

                        <span className="text-xl font-bold text-blue-700">
                          {item.name.charAt(0).toUpperCase()}
                        </span>

                      </div>

                      <div>

                        <h3 className="font-bold text-lg text-slate-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                          Student
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Student Information */}
                  <div className="mt-6 space-y-3">

                    {/* Email */}
                    <div className="flex items-center justify-between gap-3">

                      <span className="text-sm text-slate-400">
                        Email
                      </span>

                      <span className="text-sm font-medium text-slate-700 truncate">
                        {item.email}
                      </span>

                    </div>


                    {/* Roll Number */}
                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-400">
                        Roll Number
                      </span>

                      <span className="text-sm font-semibold text-slate-700">
                        {item.rollNumber}
                      </span>

                    </div>


                    {/* Department */}
                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-400">
                        Department
                      </span>

                      <span className="bg-blue-50 text-blue-700
                      px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {item.department}
                      </span>

                    </div>


                    {/* Semester */}
                    <div className="flex items-center justify-between">

                      <span className="text-sm text-slate-400">
                        Semester
                      </span>

                      <span className="bg-purple-50 text-purple-700
                      px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {item.semester}
                      </span>

                    </div>


                    {/* Course */}
                    <div className="flex items-center justify-between gap-3">

                      <span className="text-sm text-slate-400">
                        Course
                      </span>

                      {item.course ? (

                        <div className="text-right">

                          <p className="text-sm font-semibold text-slate-700">
                            {item.course.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {item.course.code}
                          </p>

                        </div>

                      ) : (

                        <span className="text-sm text-slate-400">
                          Not enrolled
                        </span>

                      )}

                    </div>

                  </div>

                </div>


                {/* Card Actions */}
                <div className="border-t border-slate-100 bg-slate-50 p-4">

                  <div className="grid grid-cols-3 gap-2">

                    {/* View */}
                    <button
                      onClick={() =>
                        navigate(`/students/${item._id}`)
                      }
                      className="py-2.5 rounded-lg
                      bg-white border border-slate-200
                      text-slate-700 text-sm font-semibold
                      hover:bg-blue-50 hover:text-blue-600
                      hover:border-blue-200
                      transition cursor-pointer"
                    >
                      View
                    </button>


                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate(`/students/${item._id}/edit`)
                      }
                      className="py-2.5 rounded-lg
                      bg-white border border-slate-200
                      text-slate-700 text-sm font-semibold
                      hover:bg-amber-50 hover:text-amber-600
                      hover:border-amber-200
                      transition cursor-pointer"
                    >
                      Edit
                    </button>


                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="py-2.5 rounded-lg
                      bg-white border border-slate-200
                      text-slate-700 text-sm font-semibold
                      hover:bg-red-50 hover:text-red-600
                      hover:border-red-200
                      transition cursor-pointer"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
