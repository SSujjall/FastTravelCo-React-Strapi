/* eslint-disable react/prop-types */
import { Button } from "./Button";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/Auth";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import LargeSearchSection from "../Home/LargeSearchSection";
import CompactSearchSection from "../Home/CompactSearchSection";

const Navbar = ({ searchCriteria, setSearchCriteria }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === "/";
  const shouldShowFullHeader = isHomePage && !isScrolled;
  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Detect scroll and toggle header layout
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    setIsScrolled(true);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("You have been logged out successfully.");
    navigate("/login");
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
    <div
      className={`sticky top-0 bg-white z-50 transition-all duration-300 mb-5 
        ${shouldShowFullHeader ? "py-6" : "py-6 shadow-md"}`}
    >
      <div className="flex flex-col justify-between px-4 lg:px-8">
        {/* Top Section: Logo and Buttons */}
        <div className={"flex items-center justify-between"}>
          {/* Logo */}
          <a href="/" className="text-xl font-bold flex-shrink-0">
            fasttravelco.
          </a>

          {/* Compact Search Section */}
          {!shouldShowFullHeader && !isLoginOrRegisterPage && (
            <div className="flex-grow mx-4 hidden sm:block">
              <CompactSearchSection
                searchCriteria={searchCriteria}
                setSearchCriteria={setSearchCriteria}
                isCompact={true}
                onSearchClick={handleSearchClick}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-4">
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
              </>
            )}
          </div>
        </div>

        {/* Header Title */}
        {shouldShowFullHeader && (
          <h2 className="text-4xl font-bold text-center mt-10">
            Your Next Destination Awaits
          </h2>
        )}

        {/* Large Search Section */}
        {shouldShowFullHeader && (
          <div className="mt-4">
            <LargeSearchSection
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
              isCompact={false}
              onSearchClick={handleSearchClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
