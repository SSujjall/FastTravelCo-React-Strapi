/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Home, Building2, Castle, Building, Tent } from "lucide-react";
import { Button } from "../Shared/Button";
import { getDestinations } from "../../services/Api";
import DestinationCard from "./DestinationCard";
import FilterModal from "../Shared/FilterModal"; // Import the new modal

const Destinations = ({ searchCriteria }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations(searchCriteria);
        setDestinations(data);
        setFilteredDestinations(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch destinations");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [searchCriteria]);

  const filters = [
    { id: "all", icon: Home, label: "All" },
    { id: "house", icon: Home, label: "House" },
    { id: "hotel", icon: Building2, label: "Hotel" },
    { id: "villa", icon: Castle, label: "Villa" },
    { id: "apartment", icon: Building, label: "Apartment" },
    { id: "camphouse", icon: Tent, label: "Camp" },
  ];

  const typeFilteredDestinations =
    activeFilter === "all"
      ? filteredDestinations
      : filteredDestinations.filter(
          (dest) => dest.type.toLowerCase() === activeFilter.toLowerCase()
        );

  const visibleDestinations = typeFilteredDestinations.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const handleApplyFilters = (newFilteredDestinations) => {
    setFilteredDestinations(newFilteredDestinations);
    setVisibleCount(8); // Reset visible count after filtering
    setActiveFilter("all"); // Reset type filter
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-8">
      <div className="flex justify-between border-b border-t">
        <div className="flex gap-8 py-4 overflow-x-auto">
          {filters.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveFilter(id);
                setVisibleCount(8);
              }}
              className={`relative flex items-center gap-2 px-1 py-2 ${
                activeFilter === id ? "font-bold text-black" : "text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
              {activeFilter === id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        <div className="min-w-[100px] max-w-[200px] flex items-center justify-center">
          <Button
            text="Filter"
            onClick={() => setIsFilterModalOpen(true)}
            icon="tune"
            className="text-black border m-auto float-right rounded"
          />
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        destinations={destinations}
        onApplyFilters={handleApplyFilters}
      />

      <div className="text-sm text-gray-600 mt-4 mb-6">
        {typeFilteredDestinations.length} total places found
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>

      {visibleCount < typeFilteredDestinations.length && (
        <div className="text-center mt-6">
          <Button
            text="Show More"
            onClick={handleShowMore}
            className="bg-black hover:bg-gray-700 mx-auto mt-10 text-white py-6 max-w-[200px] rounded"
          />
        </div>
      )}
    </div>
  );
};

export default Destinations;
