/* eslint-disable react/prop-types */
import "../../css/Card.css";

export const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};
