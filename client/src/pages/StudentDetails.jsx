import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await api.get(`/students/${id}`);

        console.log("STUDENT:", response.data);

        setStudent(response.data.student);
      } catch (error) {
        console.log("API ERROR:", error);
      }
    }

    fetchStudent();
  }, [id]);

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-lg font-medium text-slate-600">
          Loading student details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* Top Buttons */}
        <div className="flex items-center justify-between mb-6">

          <button
            onClick={() => navigate("/students")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            ← Back to Students
          </button>

          <button
            onClick={() => navigate(`/students/${student._id}/edit`)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Edit Student
          </button>

        </div>


        {/* Student Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>

          <div className="px-6 pb-6">

            <div className="flex flex-col md:flex-row md:items-end gap-4">

              {/* Avatar */}
              <div className="-mt-12 w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center border-4 border-white">
                <div className="w-full h-full rounded-xl bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {student.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Name */}
              <div className="flex-1">

                <h1 className="text-3xl font-bold text-slate-800">
                  {student.name}
                </h1>

                <p className="text-slate-500 mt-1">
                  Student ID: {student._id}
                </p>

              </div>

              {/* Semester Badge */}
              <div className="mb-1">
                <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  Semester {student.semester}
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Personal Information
            </h2>

            <div className="space-y-4">

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">
                  Full Name
                </p>
                <p className="font-semibold text-slate-800">
                  {student.name}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">
                  Email Address
                </p>
                <p className="font-semibold text-slate-800 break-words">
                  {student.email}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">
                  Roll Number
                </p>
                <p className="font-semibold text-slate-800">
                  {student.rollNumber}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">
                  Department
                </p>
                <p className="font-semibold text-slate-800">
                  {student.department}
                </p>
              </div>

            </div>

          </div>


          {/* Course Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Course Information
            </h2>

            {student.course ? (

              <div className="space-y-4">

                <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">

                  <p className="text-sm text-blue-500 mb-1">
                    Course Name
                  </p>

                  <p className="text-xl font-bold text-blue-800">
                    {student.course.name}
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="p-4 bg-slate-50 rounded-xl">

                    <p className="text-sm text-slate-500 mb-1">
                      Course Code
                    </p>

                    <p className="font-bold text-slate-800">
                      {student.course.code}
                    </p>

                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl">

                    <p className="text-sm text-slate-500 mb-1">
                      Instructor
                    </p>

                    <p className="font-bold text-slate-800">
                      {student.course.instructor}
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="h-full flex items-center justify-center">

                <div className="text-center py-10">

                  <div className="text-5xl mb-3">
                    📚
                  </div>

                  <p className="text-slate-500 font-medium">
                    No course assigned
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* Bottom Student Summary */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

          <h2 className="text-xl font-bold text-slate-800 mb-5">
            Student Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="p-5 rounded-xl bg-slate-50">
              <p className="text-sm text-slate-500">
                Department
              </p>
              <p className="text-lg font-bold text-slate-800 mt-1">
                {student.department}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50">
              <p className="text-sm text-slate-500">
                Current Semester
              </p>
              <p className="text-lg font-bold text-slate-800 mt-1">
                {student.semester}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50">
              <p className="text-sm text-slate-500">
                Course
              </p>
              <p className="text-lg font-bold text-slate-800 mt-1">
                {student.course ? student.course.code : "N/A"}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDetails;