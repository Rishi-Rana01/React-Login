import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phonenumber: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('https://localhost:7026/api/Account/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phonenumber: values.phonenumber,
          password: values.password
        })
      });

      if (response.ok) {
        setMessage('Signup successful! Redirecting to login...');
        setValues({ name: '', email: '', password: '', phonenumber: '' });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="input-box">
          <span className="icon"><i className="fa-solid fa-user"></i></span>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={values.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-box">
          <span className="icon"><i className="fa-solid fa-envelope"></i></span>
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
          <span className="icon"><i className="fa-solid fa-phone"></i></span>
          <input
            type="text"
            name="phonenumber"
            id="phonenumber"
            required
            value={values.phonenumber}
            onChange={handleChange}
          />
          <label htmlFor="phonenumber">Phone Number</label>
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
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && <div className="feedback">{message}</div>}
        <div className="register-link">
          <p>
            Already have an account?{' '}
            <a href="#" onClick={handleLoginClick}>Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;