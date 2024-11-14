/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "./Button"; // import your Button component

const SearchSection = ({ setSearchCriteria }) => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    const searchCriteria = {
      location,
      checkIn,
      checkOut,
      guests,
    };
    setSearchCriteria(searchCriteria);
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        Your Next Destination Awaits
      </h2>
      <div className="max-w-7xl mx-auto p-3 bg-white border border-slate-100 shadow-lg rounded-lg">
        <div className="flex justify-between items-center font-semibold">
          {/* Section 1 */}
          <div className="flex items-center space-x-2">
            <span className="material-icons">location_on</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="border rounded p-2"
            />
          </div>

          <div className="hidden sm:block mx-4 h-16 border-l border-gray-400"></div>

          {/* Section 2 (Hidden on mobile) */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="material-icons">calendar_today</span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border rounded p-2"
            />
          </div>

          <div className="hidden sm:block mx-4 h-16 border-l border-gray-400"></div>

          {/* Section 3 (Hidden on mobile) */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="material-icons">people</span>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Guests"
              className="border rounded p-2"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-center space-x-2">
            <Button
              text="Search"
              onClick={handleSearch}
              icon="search"
              className="bg-black text-white hover:bg-slate-600 w-auto min-w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
