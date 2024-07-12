import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogin({ setIsAuthenticated, setUsername }) {
  const [loginUsername, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      axios.post('http://localhost:3000/token', { token: refreshToken })
        .then(response => {
          localStorage.setItem('accessToken', response.data.accessToken);
          setIsAuthenticated(true);
          setUsername(localStorage.getItem('username'));
          navigate('/');
        })
        .catch(error => {
          console.error('Token refresh error:', error);
        });
    }
  }, [setIsAuthenticated, setUsername, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: loginUsername,
        password,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('username', response.data.username);
      setIsAuthenticated(true);
      setUsername(response.data.username);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password');
      } else {
        setMessage('There is an error');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
