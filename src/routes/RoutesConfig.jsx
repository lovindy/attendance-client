import DashboardPage from '../pages/DashboardPage';
import AttendancePage from '../pages/attendance/AttendancePage';
import StudentsPage from '../pages/students/StudentsPage';
import TeachersPage from '../pages/teachers/TeachersPage';
import AdminsPage from '../pages/admins/AdminsPage';
import UsersPage from '../pages/users/UsersPage';
import UserDetail from '../pages/users/UserDetail';
import ClassPage from '../pages/classes/ClassPage';
import LandingPage from '../pages/LandingPage';
import SignupForm from '../pages/auth/SignupTest';
import LoginPage from '../pages/auth/LoginPage';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFoundPage from '../pages/NotFoundPage';

export const routes = [
  // Public Routes
  { path: '/', element: <LandingPage />, protected: false },
  { path: '/signup', element: <SignupForm />, protected: false },
  { path: '/login', element: <LoginPage />, protected: false },
  { path: '/reset-password', element: <ForgotPassword />, protected: false },

  // Protected Routes
  { path: '/dashboard', element: <DashboardPage />, protected: true },
  { path: '/attendance', element: <AttendancePage />, protected: true },
  { path: '/students', element: <StudentsPage />, protected: true },
  { path: '/teachers', element: <TeachersPage />, protected: true },
  { path: '/admins', element: <AdminsPage />, protected: true },
  {
    path: '/users',
    element: <UsersPage />,
    protected: true,
    children: [{ path: ':id', element: <UserDetail />, protected: true }],
  },
  { path: '/classes', element: <ClassPage />, protected: true },

  // Catch-All Route
  { path: '*', element: <NotFoundPage />, protected: false },
];
