/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/Api";
import { Button } from "../../components/Shared/Button";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null); // For success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors and success message
    setFormErrors({});
    setSuccessMessage(null);

    let errors = {};

    // Validation for username
    if (!username) {
      errors.username = "Username is required.";
    }

    // Validation for email
    if (!email) {
      errors.email = "Email is required.";
    }

    // Validation for password
    if (!password) {
      errors.password = "Password is required.";
    }

    // If there are any validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await register(username, email, password);
      setSuccessMessage("You have successfully registered!"); // Show success message

      // Redirect to login page after a brief delay
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const getInputBorderClass = (field) => {
    return formErrors[field] ? "border-red-500" : "border-gray-300";
  };

  return (
    <div className="flex -mt-20 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderClass(
                "username"
              )}`}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderClass(
                "email"
              )}`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderClass(
                "password"
              )}`}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            text={"Register"}
            className="w-full bg-black text-lg py-6 text-white"
          />
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Show success message after successful registration */}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
