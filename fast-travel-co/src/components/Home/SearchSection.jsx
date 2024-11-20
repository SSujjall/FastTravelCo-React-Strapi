/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Button } from "../Shared/Button";
import { getDestinations } from "../../services/Api";

const SearchSection = ({
  searchCriteria,
  setSearchCriteria,
  onSearchClick,
  variant = "large",
}) => {
  const [location, setLocation] = useState(searchCriteria.location || "");
  const [checkIn, setCheckIn] = useState(searchCriteria.checkIn || "");
  const [checkOut, setCheckOut] = useState(searchCriteria.checkOut || "");
  const [guests, setGuests] = useState(searchCriteria.guests || "");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [locationData, setLocationData] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const locationInputRef = useRef(null);
  const locationDropdownRef = useRef(null);

  // Fetch destinations when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const destinations = await getDestinations();

        // Group destinations by location and collect first image
        const locationMap = destinations.reduce((acc, dest) => {
          if (!acc[dest.location]) {
            acc[dest.location] = {
              location: dest.location,
              image:
                dest.images && dest.images.length > 0 ? dest.images[0] : null,
              destinations: [dest],
            };
          } else {
            acc[dest.location].destinations.push(dest);
          }
          return acc;
        }, {});

        const processedLocations = Object.values(locationMap);
        setLocationData(processedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationChange = (e) => {
    const inputValue = e.target.value;
    setLocation(inputValue);

    // Filter locations based on input
    const filtered = locationData.filter((locData) =>
      locData.location.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredLocations(filtered);
    setIsLocationDropdownOpen(true);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setIsLocationDropdownOpen(false);
  };

  const handleSearch = () => {
    const newSearchCriteria = {
      location,
      checkIn,
      checkOut,
      guests,
    };
    setSearchCriteria(newSearchCriteria);
    onSearchClick();
  };

  const formatDateRange = () => {
    if (!checkIn && !checkOut) return "Check-in - Check-out";
    if (!checkOut) return new Date(checkIn).toLocaleDateString();
    return `${new Date(checkIn).toLocaleDateString()} - ${new Date(
      checkOut
    ).toLocaleDateString()}`;
  };

  const containerClasses =
    variant === "large"
      ? "max-w-7xl mx-auto p-3 px-4 bg-white border border-slate-100 shadow-lg rounded-lg"
      : "max-w-4xl mx-auto p-3 bg-white border border-slate-100 shadow-lg rounded-full";

  const textSizeClasses = variant === "large" ? "" : "text-sm";

  const separatorClasses =
    variant === "large"
      ? "hidden lg:block mx-4 h-16 border-l border-gray-200"
      : "hidden lg:block mx-4 h-10 my-auto border-l border-gray-200";

  return (
    <div className="px-4 py-4">
      <div className={containerClasses}>
        <div className="flex flex-row justify-between items-stretch font-semibold gap-4">
          {/* Location Section with Autocomplete */}
          <div className="flex items-center space-x-2 flex-1 relative">
            <span className="material-symbols-outlined p-2 bg-gray-200 rounded-full">
              location_on
            </span>
            <div className="w-full relative">
              <input
                ref={locationInputRef}
                type="text"
                value={location}
                onChange={handleLocationChange}
                onFocus={() => setIsLocationDropdownOpen(true)}
                placeholder="Enter location"
                className={`border-0 rounded p-2 w-full outline-none  ${textSizeClasses}`}
              />
              {isLocationDropdownOpen && filteredLocations.length > 0 && (
                <div
                  ref={locationDropdownRef}
                  className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-auto"
                >
                  {filteredLocations.map((locData) => (
                    <div
                      key={locData.location}
                      onClick={() => handleLocationSelect(locData.location)}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                    >
                      {locData.image ? (
                        <img
                          src={locData.image}
                          alt={locData.location}
                          className="w-14 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                          No Image
                        </div>
                      )}
                      <div>
                        <div>{locData.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={separatorClasses} />

          {/* Dates Section */}
          <div className="hidden md:flex items-center space-x-2 flex-1 relative">
            <span className="material-icons p-2 bg-gray-200 rounded-full">
              calendar_today
            </span>
            <div
              className="flex flex-1 cursor-pointer p-2"
              onClick={() => setIsDatePickerVisible(!isDatePickerVisible)}
            >
              <span className={`text-gray-600 ${textSizeClasses}`}>
                {formatDateRange()}
              </span>
            </div>

            {/* Date Picker Inputs */}
            {isDatePickerVisible && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10 border border-gray-200 flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (
                        !checkOut ||
                        new Date(e.target.value) > new Date(checkOut)
                      ) {
                        setCheckOut(e.target.value);
                      }
                    }}
                    className="border rounded p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-600 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="border rounded p-2 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className={separatorClasses} />

          {/* Guests Section */}
          <div className="hidden md:flex items-center space-x-2 flex-1">
            <span className="material-symbols-outlined p-2 bg-gray-200 rounded-full">
              person
            </span>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="No. of Guests"
              className={`border-0 rounded p-2 w-full outline-none ${textSizeClasses}`}
            />
          </div>

          {/* Search Button */}
          <div className="flex items-center">
            <Button
              text={variant === "large" ? "Search" : ""}
              onClick={handleSearch}
              icon="search"
              className={`
                bg-black rounded text-white hover:bg-slate-600 
                ${
                  variant === "large"
                    ? "w-full lg:w-auto min-w-[120px]"
                    : "w-full lg:w-auto min-w-[40px] rounded-full"
                }
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
