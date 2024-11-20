import { useNavigate } from "react-router-dom";
import { Button } from "../components/Shared/Button";
import "../css/NotFound.css"; 

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-text">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button
        className="not-found-button"
        onClick={goToHome}
        text="Go Home"
      ></Button>
    </div>
  );
};

export default NotFound;
