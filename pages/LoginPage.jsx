import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // For now, just log form data and navigate
    console.log('Login form submitted:', formData);
    alert('Login successful (demo)');
    navigate('/interview'); // redirect to chat page
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="form bg-[#0c0a1a] p-10 rounded-lg shadow-lg w-full max-w-md">
        {/* Heading */}
        <div className="heading mb-6 text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FaSignInAlt /> Login
          </h1>
          <p className="text-gray-400 mt-2">Please log in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
