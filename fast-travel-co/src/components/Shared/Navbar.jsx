import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/Auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("You have been logged out successfully.");
    navigate("/login"); // Redirect to login after logout
  };

  const isLoggedIn = authService.isLoggedIn();
  const username = authService.getUsername();

  const getInitials = (name) => {
    const parts = name.split(" ");
    return parts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex justify-between items-center p-4 px-8">
      {/* Logo */}
      <a href="/">
        <div className="text-xl font-bold">fasttravelco.</div>
      </a>

      {/* Buttons or User Info */}
      <div className="flex items-center space-x-2">
        {!isLoggedIn ? (
          <>
            <Button
              text="Register"
              onClick={handleRegisterClick}
              className="text-black py-2 px-4 rounded"
            />
            <Button
              text="Sign-in"
              onClick={handleLoginClick}
              className="bg-black text-white py-2 px-4 rounded hover:bg-slate-600"
            />
          </>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <div
                onClick={() => navigate("/myBookings")}
                className="cursor-pointer w-8 h-8 p-4 flex items-center justify-center rounded-full bg-gray-500 text-white"
              >
                {getInitials(username)}
              </div>
              <Button
                text="Logout"
                onClick={handleLogout}
                className="text-black py-2 px-4 min-w-[130px] rounded border-2 border-black hover:bg-black hover:text-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
