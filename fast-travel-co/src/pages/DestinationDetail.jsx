import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { destinationService } from "../services/Api";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const destinations = await destinationService.getDestinations();
        const currentDestination = destinations.find(
          (d) => d.id === parseInt(id)
        );
        setDestination(currentDestination);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch destination details:", error);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!destination) {
    return <div className="text-center py-8">Destination not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={destination.images[activeImageIndex]}
              alt={destination.location}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {destination.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-[4/3] overflow-hidden rounded-lg cursor-pointer ${
                  index === activeImageIndex ? "ring-2 ring-black" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${destination.location} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{destination.location}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center">
                <span>★</span>
                <span className="ml-1">{destination.rating}</span>
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-600">{destination.type}</span>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Guests:</span>{" "}
                {destination.guests}
              </div>
              <div>
                <span className="font-medium">Bedrooms:</span>{" "}
                {destination.beds}
              </div>
              <div>
                <span className="font-medium">Bathrooms:</span>{" "}
                {destination.baths}
              </div>
              <div>
                <span className="font-medium">Price:</span> ${destination.price}
                /night
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
