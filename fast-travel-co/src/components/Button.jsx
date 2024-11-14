/* eslint-disable react/prop-types */
import "../css/Button.css";
export const Button = ({ text, onClick, icon, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <span className="material-icons">{icon}</span>} {/* Display icon if provided */}
      {text}
    </button>
  );
};