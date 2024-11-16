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
      <h2 className="text-4xl font-bold text-center mb-4">
        Your Next Destination Awaits
      </h2>
      <div className="max-w-7xl mx-auto p-3 bg-white border border-slate-100 shadow-lg rounded-lg">
        <div className="flex flex-row lg:flex-row justify-between items-stretch lg:items-center font-semibold gap-4 lg:gap-2">
          {/* Location Section */}
          <div className="flex items-center space-x-2 flex-1">
            <span className="material-symbols-outlined p-2 bg-gray-200 rounded-full">
              location_on
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="border-0 rounded p-2 w-full outline-none"
            />
          </div>

          <div className="hidden lg:block mx-4 h-16 border-l border-gray-200" />

          {/* Dates Section */}
          <div className="hidden md:flex items-center space-x-2 flex-1">
            <span className="material-icons p-2 bg-gray-200 rounded-full">
              calendar_today
            </span>
            <div className="flex flex-1 gap-2">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-0 rounded p-2 w-full outline-none"
              />
              _
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-0 rounded p-2 w-full outline-none"
              />
            </div>
          </div>

          <div className="hidden lg:block mx-4 h-16 border-l border-gray-200" />

          {/* Guests Section */}
          <div className="hidden md:flex items-center space-x-2 flex-1">
            <span className="material-symbols-outlined p-2 bg-gray-200 rounded-full">
              person
            </span>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Guests"
              className="border-0 rounded p-2 w-full outline-none"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-center">
            <Button
              text="Search"
              onClick={handleSearch}
              icon="search"
              className="bg-black text-white hover:bg-slate-600 w-full lg:w-auto min-w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
