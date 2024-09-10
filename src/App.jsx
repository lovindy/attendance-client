import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';

// Pages Components
import AttendancePage from './pages/attendance/AttendancePage';
import StudentsPage from './pages/students/StudentsPage';
import TeachersPage from './pages/teachers/TeachersPage';
import AdminsPage from './pages/admins/AdminsPage';
import UsersPage from './pages/users/UsersPage';
import UserDetail from './pages/users/UserDetail';
import ClassPage from './pages/classes/ClassPage';
import NotFoundPage from './pages/NotFoundPage';

// Landing Page
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

// Authentication
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPassword from './pages/auth/ResetPassword';
import SignupForm from './pages/auth/SignupTest';

// Common Components
import Navbar from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => (
  <>
    <Navbar />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<DashboardPage />} />}
      />
      <Route
        path="/attendance"
        element={<ProtectedRoute element={<AttendancePage />} />}
      />
      <Route
        path="/students"
        element={<ProtectedRoute element={<StudentsPage />} />}
      />
      <Route
        path="/teachers"
        element={<ProtectedRoute element={<TeachersPage />} />}
      />
      <Route
        path="/admins"
        element={<ProtectedRoute element={<AdminsPage />} />}
      />
      <Route path="/users" element={<ProtectedRoute element={<UsersPage />} />}>
        <Route
          path=":id"
          element={<ProtectedRoute element={<UserDetail />} />}
        />
      </Route>
      <Route
        path="/classes"
        element={<ProtectedRoute element={<ClassPage />} />}
      />

      {/* Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
