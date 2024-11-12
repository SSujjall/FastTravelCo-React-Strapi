import { Button } from "./Button"; // import Button component

const Navbar = () => {
  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  const handleRegisterClick = () => {
    console.log("Register clicked");
  };

  return (
    <div className="flex justify-between items-center p-4">
      {/* Logo */}
      <div className="text-xl font-bold">fasttravelco.</div>

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
