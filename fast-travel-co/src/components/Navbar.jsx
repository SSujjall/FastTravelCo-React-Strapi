import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex justify-between items-center p-4 px-8">
      {/* Logo */}
      <a href="/"><div className="text-xl font-bold">fasttravelco.</div></a>

      {/* Buttons */}
      <div className="flex space-x-2">
        <Button
          text="Register"
          onClick={handleRegisterClick}
          className="text-black py-2 px-4 rounded"
        />

        <Button
          text="Sign-in"
          onClick={handleLoginClick}
          icon=""
          className="bg-black text-white py-2 px-4 rounded hover:bg-slate-600"
        />
      </div>
    </div>
  );
};

export default Navbar;
