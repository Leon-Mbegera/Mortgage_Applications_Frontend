import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, removeToken } from "../utils/auth";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const role = getUserRole();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/"className="text-xl font-bold">Mortgage Portal</Link>
      </div>
      <div>
        {
          isAuth ? (
            <>
              {role === 'USER' && <Link to="/user_dashboard" className="mr-4">User Dashboard</Link>}
              {role === 'ADMIN' && <Link to="/admin_dashboard" className="mr-4">Admin Dashboard</Link>}
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
        )}
      </div>
    </nav>
  )
}

export default NavBar;