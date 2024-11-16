/* eslint-disable react/prop-types */
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );
};
