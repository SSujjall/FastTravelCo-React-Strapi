/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const MapModal = ({ isOpen, onClose, location }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!isOpen || !location) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          });
        } else {
          setError("Location not found");
        }
      } catch (err) {
        setError("Failed to load location");
      } finally {
        setLoading(false);
      }
    };

    initializeMap();
  }, [isOpen, location]);

  useEffect(() => {
    if (!isOpen || !coordinates) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(link);

    const L = window.L;
    const map = L.map("map").setView([coordinates.lat, coordinates.lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.marker([coordinates.lat, coordinates.lon]).addTo(map);

    return () => {
      map.remove();
      document.head.removeChild(link);
    };
  }, [isOpen, coordinates]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-[800px] h-[600px] rounded-lg flex flex-col">
        {/* Header with close button */}
        <div className="absolute top-0 right-0 left-0 h-12 flex justify-end items-center px-4 z-20">
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Map container */}
        <div className="relative flex-1 w-full">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-10">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          <div id="map" className="absolute inset-0 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
