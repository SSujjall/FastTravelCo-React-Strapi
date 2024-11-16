/* eslint-disable react/prop-types */
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        let fill = "none";
        let stroke = "#d1d5db"; // Default stroke for empty stars (grey)
        if (index < fullStars) {
          fill = "#eb4700"; // Full star color (orange)
          stroke = "#eb4700"; // Stroke for full stars (orange)
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="w-5 h-5">
              <svg
                viewBox="0 0 24 24"
                fill={fill}
                stroke={stroke}
                className="text-orange-600"
              >
                <defs>
                  <linearGradient id="halfFill">
                    <stop offset="50%" stopColor="#eb4700" />
                    <stop offset="50%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#halfFill)"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  strokeWidth="1.5"
                  stroke="#eb4700" // Ensuring the stroke color for half star is orange
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          );
        }
        return (
          <div key={index} className="w-5 h-5">
            <svg
              viewBox="0 0 24 24"
              fill={fill}
              stroke={stroke}
              className="text-gray-300"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
