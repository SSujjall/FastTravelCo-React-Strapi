/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Api";
import { authService } from "../../services/Auth";
import { Button } from "../../components/Button";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset previous errors
    setFormErrors({});
  
    let errors = {};
  
    // Validation for identifier (email/username)
    if (!identifier) {
      errors.identifier = "Email is required.";
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
      const { jwt, user } = await login(identifier, password);
      authService.login(jwt, user.username); // Save token and username
      navigate("/"); // Redirect to home
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };
  

  const getInputBorderClass = (field) => {
    return formErrors[field] ? "border-red-500" : "border-gray-300";
  };

  return (
    <div className="flex -mt-20 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderClass(
                "identifier"
              )}`}
            />
            {formErrors.identifier && (
              <p className="text-red-500 text-sm">{formErrors.identifier}</p>
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
            text={"Sign-in"}
            className="w-full bg-black text-lg py-6 text-white"
          />
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
