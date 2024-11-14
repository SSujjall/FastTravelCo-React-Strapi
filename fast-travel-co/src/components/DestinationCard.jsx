/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      className="group relative cursor-pointer border rounded-lg shadow-lg"
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
        <div className="flex justify-between">
          <h3 className="font-semibold">{destination.location}</h3>
          <div className="flex items-center gap-1">
            <span>★</span>
            <span>{destination.rating}</span>
          </div>
        </div>

        <div className="text-gray-600 text-sm">
          {destination.guests} guests · {destination.beds} bedrooms ·{" "}
          {destination.baths} bathroom
        </div>

        <div className="mt-1">
          <span className="font-semibold">${destination.price}</span>
          <span className="text-gray-600"> /night</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;