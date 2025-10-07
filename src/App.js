import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';
import UserDashboard from './components/UserDashboard.js';
import AdminDashboard from './components/AdminDashboard.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { isAuthenticated, getUserRole } from './utils/auth.js';

function ProtectedRoute({ children, role }) {
  if (!isAuthenticated()) {
    return <Navigate to='/login' />
  }

  if (role && getUserRole !== role) {
    return <Navigate to='/login' />
  }
  return children;
}

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          >
          </Route>
          <Route
            path="/register"
            element={<Register />}
          >
          </Route>
          <Route
            path="/user_dashboard"
            element={
              <ProtectedRoute role='USER'>
                <UserDashboard />
              </ProtectedRoute>
            }
          >
          </Route>
          <Route
            path="/admin_dashboard"
            element={
              <ProtectedRoute role='ADMIN'>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
          </Route>
          <Route path='/' element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
