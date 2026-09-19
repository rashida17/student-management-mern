import './App.css'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Student from './pages/Student'
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';
function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/students" element={<Student />} />
        <Route path="/students/add" element={ <AddStudent />} />
        <Route path="/students/:id/edit" element={<EditStudent/>} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>

    </div>
  );
}

export default App;