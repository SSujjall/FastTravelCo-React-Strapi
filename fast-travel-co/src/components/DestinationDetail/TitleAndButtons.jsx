/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MapModal from './MapModal';

const TitleAndButtons = ({ destination }) => {
  const [isSaved, setIsSaved] = useState(() => {
    const savedState = sessionStorage.getItem(`saved-${destination.id}`);
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Add this useEffect to load Leaflet script
  useEffect(() => {
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const handleSaveClick = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    sessionStorage.setItem(`saved-${destination.id}`, JSON.stringify(newState));
  };

  return (
    <div className="flex justify-between mt-8 mb-2">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold">{destination.title}</h1>
      </div>
      <div className="flex lg:flex-row flex-col justify-end items-center gap-2 w-1/3">
        <button 
          onClick={() => setIsMapOpen(true)}
          className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm min-w-[126px]"
        >
          <span className="material-symbols-outlined text-base">map</span>
          <span>View in map</span>
        </button>

        <button
          onClick={handleSaveClick}
          className={`flex items-center border px-2 py-1 gap-1 rounded-lg text-sm ${
            isSaved ? "text-red-500 border-red-500" : ""
          }`}
        >
          <span
            className={`material-symbols-outlined text-base ${
              isSaved ? "text-red-500" : ""
            }`}
          >
            {isSaved ? "favorite" : "favorite_border"}
          </span>
          <span>Save</span>
        </button>

        <button className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm">
          <span className="material-symbols-outlined text-base">share</span>
          <span>Share</span>
        </button>

        <MapModal 
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          location={destination.location}
        />
      </div>
    </div>
  );
};

export default TitleAndButtons;