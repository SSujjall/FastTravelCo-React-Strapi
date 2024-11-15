/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setActiveImageIndex(index);
  };

  return (
    <div
      onClick={() => navigate(`/destination/${destination.id}`)}
      className="group relative cursor-pointer rounded-lg shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        {destination.images?.length > 0 ? (
          <img
            src={destination.images[activeImageIndex]}
            alt={destination.location}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            // Add favorite logic here
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-white/80"
        >
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {destination.images?.length > 0 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {destination.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                  i === activeImageIndex ? "bg-white" : "bg-white/60"
                }`}
                onClick={(e) => handleDotClick(e, i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 p-3">
        <div>
          <h3 className="font-semibold">{destination.location}</h3>
          <div className="text-gray-600 text-sm">
            {destination.guests} guests · {destination.beds} bedrooms ·{" "}
            {destination.baths} bathroom
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <span className="font-light text-gray-600">From&nbsp;</span>
              <span className="font-semibold">${destination.price}</span>
              <span className="text-gray-600">&nbsp;/night</span>
            </div>

            <div className="flex items-center gap-1">
              <span>{destination.rating}</span>
              <StarRating rating={destination.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;