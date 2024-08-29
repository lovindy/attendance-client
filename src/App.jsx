import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages Components
import AttendancePage from './pages/attendance/AttendancePage';
import StudentsPage from './pages/students/StudentsPage';
import TeachersPage from './pages/teachers/TeachersPage';
import AdminsPage from './pages/admins/AdminsPage';
import UsersPage from './pages/users/UsersPage';
import UserDetail from './pages/users/UserDetail';
import ClassPage from './pages/classes/ClassPage';
import NotFoundPage from './pages/NotFoundPage';
// import SchoolRegister from './pages/auth/SchoolRegister';

// Landing Page
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

// Authentication
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';

// Common Components
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => (
  <>
    <Navbar />
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/school" element={<SchoolRegister />} /> */}

      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/admins" element={<AdminsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/classes" element={<ClassPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
