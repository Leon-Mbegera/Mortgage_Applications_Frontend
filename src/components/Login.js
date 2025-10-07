import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';
import { setToken, getUserRole } from '../utils/auth.js';
import { Eye, EyeClosed } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setShowLoader(true);

      const response = await login(username, password);
      console.log('login response', response)

      setToken(response);
      const role = getUserRole();
      if (role === 'ADMIN') {
        navigate('/admin_dashboard');
      } else {
        navigate('/user_dashboard');
      }

    } catch (e) {
      console.log('login error', e);
    } finally {
      setShowLoader(false);
    }
  }

  const togglePassVisibility = () => {
    setPassVisible(!passVisible);
  }

  useEffect(() => {
    return;

  }, [passVisible])

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl mb-4">Login</h2>
        {errors.length > 0 && <p className="text-red-500">{errors.join(', ')}</p>}
        <div className="space-y-4">
          <div className='flex flex-col items-start space-y-2'>
            <label htmlFor='username' className='text-lg font-semibold'>Username</label>
            <input
              id='username'
              type='text'
              placeholder='Enter username'
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className='flex flex-col items-start space-y-2'>
            <label htmlFor='password' className='text-lg font-semibold'>Password</label>
            <div className='relative w-full flex justify-between'>
              <input
                id='password'
                type={passVisible ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button type='button' className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500" onClick={togglePassVisibility}>
                {passVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default Login;