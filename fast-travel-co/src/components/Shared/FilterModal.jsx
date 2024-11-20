/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "../Shared/Button";
import {
  AirVent,
  Wifi,
  CookingPot,
  MonitorCheck,
  Waves,
  Dock,
  HandPlatter,
  BoomBox,
  BaggageClaim,
} from "lucide-react";
import { X } from "lucide-react";

const amenityIcons = {
  "Air Conditioning": <AirVent className="text-gray-500" />,
  "Fast Wifi": <Wifi className="text-gray-500" />,
  "Equipped Kitchen": <CookingPot className="text-gray-500" />,
  "Dedicated Workspace": <MonitorCheck className="text-gray-500" />,
  "Hot Water": <Waves className="text-gray-500" />,
  "Drying Rack": <Dock className="text-gray-500" />,
  "Dining Table": <HandPlatter className="text-gray-500" />,
  "Cleaning during stay": <BoomBox className="text-gray-500" />,
  "Luggage Dropoff": <BaggageClaim className="text-gray-500" />,
};

const FilterModal = ({ isOpen, onClose, destinations, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [bedroomCount, setBedroomCount] = useState(null);
  const [bathroomCount, setBathroomCount] = useState(null);

  const allAmenities = [
    ...new Set(
      destinations.flatMap((dest) => dest.amenities.map((a) => a.Name))
    ),
  ];
  const maxPrice = Math.max(...destinations.map((dest) => dest.price), 1000);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [isOpen, maxPrice]);

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleApplyFilters = () => {
    const filteredDestinations = destinations.filter((dest) => {
      const priceMatch =
        dest.price >= priceRange[0] && dest.price <= priceRange[1];
      const amenitiesMatch =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((amenity) =>
          dest.amenities.some((a) => a.Name === amenity)
        );
      const bedroomMatch = bedroomCount === null || dest.beds === bedroomCount;
      const bathroomMatch =
        bathroomCount === null || dest.baths === bathroomCount;
      return priceMatch && amenitiesMatch && bedroomMatch && bathroomMatch;
    });
    onApplyFilters(filteredDestinations);
    onClose();
  };

  const handleClearAll = () => {
    setPriceRange([0, maxPrice]);
    setSelectedAmenities([]);
    setBedroomCount(null);
    setBathroomCount(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-[600px] max-h-[82vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title and Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Price Range Slider */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center space-x-6">
            <div className="flex gap-2">
              <span>from</span>
              <span>${priceRange[0]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="flex-grow"
            />
            <div className="flex gap-2">
              <span>to</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-6 flex justify-between">
          <h3 className="font-semibold mb-2">Bedrooms</h3>
          <div className="grid grid-cols-3 items-center gap-2">
            <button
              className="px-3 py-1 rounded-full border-2 border-gray-300"
              onClick={() =>
                setBedroomCount(bedroomCount > 1 ? bedroomCount - 1 : null)
              }
            >
              -
            </button>
            <span className="text-base font-semibold flex justify-center">
              {bedroomCount === null ? "Any" : bedroomCount}
            </span>
            <button
              className="px-3 py-1 rounded-full border-2 border-gray-300"
              onClick={() =>
                setBedroomCount(bedroomCount !== null ? bedroomCount + 1 : 1)
              }
            >
              +
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="mb-6 flex justify-between">
          <h3 className="font-semibold mb-2">Bathrooms</h3>
          <div className="grid grid-cols-3 items-center gap-2">
            <button
              className="px-3 py-1 rounded-full border-2 border-gray-300"
              onClick={() =>
                setBathroomCount(bathroomCount > 1 ? bathroomCount - 1 : null)
              }
            >
              -
            </button>
            <span className="text-base font-semibold flex justify-center">
              {bathroomCount === null ? "Any" : bathroomCount}
            </span>
            <button
              className="px-3 py-1 rounded-full border-2 border-gray-300"
              onClick={() =>
                setBathroomCount(bathroomCount !== null ? bathroomCount + 1 : 1)
              }
            >
              +
            </button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="grid grid-cols-3 gap-2">
            {allAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleAmenityToggle(amenity)}
              >
                {/* Border div for checkbox */}
                <div
                  className={`w-full p-2 border-2 rounded-md transition-colors min-h-[70px] ${
                    selectedAmenities.includes(amenity)
                      ? "border-black text-black"
                      : "border-gray-200 bg-white text-black"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {amenityIcons[amenity] || null}
                    <span>{amenity}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            text="Clear All"
            onClick={handleClearAll}
            className="col-span-1 text-black"
          />
          <Button
            text="Apply"
            onClick={handleApplyFilters}
            className="col-span-2 bg-black text-white rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
