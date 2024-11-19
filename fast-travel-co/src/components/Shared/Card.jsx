/* eslint-disable react/prop-types */
export const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg border shadow-lg ${className}`}>
      {children}
    </div>
  );
};
