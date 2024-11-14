/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Home, Building2, Castle, Building, Tent } from "lucide-react";
import { Button } from "./Button";
import { destinationService } from "../services/Api";
import DestinationCard from "./DestinationCard";

const Destinations = () => {
  const [activeFilter, setActiveFilter] = useState("house");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getDestinations();
        setDestinations(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch destinations");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filters = [
    { id: "house", icon: Home, label: "House" },
    { id: "hotel", icon: Building2, label: "Hotel" },
    { id: "villa", icon: Castle, label: "Villa" },
    { id: "apartment", icon: Building, label: "Apartment" },
    { id: "camp", icon: Tent, label: "Camp House" },
  ];

  const filteredDestinations =
    activeFilter === "all"
      ? destinations
      : destinations.filter((dest) => dest.type === activeFilter);

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
              onClick={() => setActiveFilter(id)}
              className="relative flex items-center gap-2 px-1 py-2"
            >
              <Icon className="w-5 h-5 text-gray-700" />
              <span className="text-sm text-gray-700">{label}</span>
              {activeFilter === id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        <div className="min-w-[100px] max-w-[200px] flex items-center justify-center">
          <Button
            text="Filter"
            onClick={() => {}}
            icon="tune"
            className="text-black border m-auto float-right"
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 mt-4 mb-6">
        {destinations.length} total places found
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default Destinations;
