import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('https://localhost:7026/api/Account/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        // const data = await response.json();
        setMessage('Login successful!');
        // localStorage.setItem('token', data.token); // if needed
        // navigate('/dashboard'); // redirect after login
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={LoginUser}>
        <div className="input-box">
          <span className="icon"><i className="fa-solid fa-user"></i></span>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-box">
          <span className="icon"><i className="fa-solid fa-lock"></i></span>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={values.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && <div className="feedback">{message}</div>}
        <div className="register-link">
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={e => { e.preventDefault(); handleSignupClick(); }}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;