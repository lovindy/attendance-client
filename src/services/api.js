import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function for GET requests
const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    console.log('GET response data:', response.data); // Debugging line
    return response.data.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed`, error);
    throw error;
  }
};

// Generic function for POST requests
const postRequest = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed`, error);
    throw error;
  }
};

// Generic function for PUT requests
const putRequest = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint} failed`, error);
    throw error;
  }
};

const deleteRequest = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    console.log('DELETE response:', response);
    // Check if deletion was successful based on status or a message
    if (response.status === 200) {
      return 'Item deleted successfully';
    } else {
      return 'Deletion failed';
    }
  } catch (error) {
    console.error(`DELETE ${endpoint} failed`, error);
    throw error;
  }
};

// Student API
const fetchStudents = () => getRequest('/students');
const createStudent = (student) => postRequest('/students', student);
const updateStudent = (id, student) => putRequest(`/students/${id}`, student);
const deleteStudent = (id) => deleteRequest(`/students/${id}`);

// Attendance API
const getStudentsWithAttendance = (attendance) =>
  getRequest('/attendance/students', attendance);
const recordAttendance = (attendance) => postRequest('/attendance', attendance);
const updateAttendance = (id, attendance) =>
  putRequest(`/attendance/${id}`, attendance);
const deleteAttendance = (id) => deleteRequest(`/attendance/${id}`);

// Teacher API
const fetchTeachers = () => getRequest('/teachers');
const createTeacher = (teacher) => postRequest('/teachers', teacher);
const updateTeacher = (id, teacher) => putRequest(`/teachers/${id}`, teacher);
const deleteTeacher = (id) => deleteRequest(`/teachers/${id}`);

// Admin API
const fetchAdmins = () => getRequest('/admins');
const createAdmin = (admin) => postRequest('/admins', admin);
const updateAdmin = (id, admin) => putRequest(`/admins/${id}`, admin);
const deleteAdmin = (id) => deleteRequest(`/admins/${id}`);

// User API
const fetchUsers = () => getRequest('/users');
const createUser = (user) => postRequest('/users', user);
const updateUser = (id, user) => putRequest(`/users/${id}`, user);
const deleteUser = (id) => deleteRequest(`/users/${id}`);

export default {
  // Student
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,

  // Attendance
  getStudentsWithAttendance,
  recordAttendance,
  updateAttendance,
  deleteAttendance,

  // Teacher
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,

  // Admin
  fetchAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,

  // User
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
};
