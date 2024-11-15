/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, Heart, Play } from "lucide-react";
import { destinationService } from "../services/Api";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "12th January, 2024",
    checkOut: "17th February, 2024",
  });
  const [guests, setGuests] = useState(2);

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
    <div className="max-w-[1800px] px-8 mx-auto">
      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4 border">
        {/* Left Column - Main Image */}
        <div className="col-span-2">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={destination.images[activeImageIndex]}
              alt={destination.location}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Right Column - Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-2">
          {destination.images.map((image, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`${destination.location} ${index + 1}`}
                className="w-full h-[150px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border flex justify-between mt-8">
        <div className="w-2/3 border">
          <h1 className="text-2xl font-bold">{destination.title}</h1>
        </div>
        <div className="flex lg:flex-row flex-col justify-end items-center gap-2 border w-1/3">
          <a
            href=""
            className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm min-w-[126px]"
          >
            <span className="material-symbols-outlined text-base">map</span>
            <span>View in map</span>
          </a>

          <a
            href=""
            className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm"
          >
            <span className="material-symbols-outlined text-base">
              favorite
            </span>
            <span>Save</span>
          </a>

          <a
            href=""
            className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>Share</span>
          </a>
        </div>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-3 gap-8 border">
        <div className="col-span-2">
          <div className="flex justify-between mb-6">
            <div>
              <p className="flex gap-2">
                <span className="material-symbols-outlined">location_on</span>
                <p>{destination.location}</p>
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {destination.guests} guests • {destination.beds} bedrooms •{" "}
                {destination.baths} bathrooms
              </p>
            </div>

            <div className="w-100 flex justify-end items-center">
              <span className="text-2xl font-bold">${destination.price}</span>
              <span className="text-gray-600 text-sm">&nbsp;/night</span>
            </div>
          </div>

          <div className="text-sm">{destination.description}</div>

          <div className="border-t border-b py-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Type:</span> {destination.type}
              </div>
              <div>
                <span className="font-medium">Rating:</span>{" "}
                {destination.rating.toFixed(1)} ★
              </div>
              <div>
                <span className="font-medium">Guests:</span>{" "}
                {destination.guests}
              </div>
              <div>
                <span className="font-medium">Price:</span> ${destination.price}
                /night
              </div>
              <div>
                <span className="font-medium">Bedrooms:</span>{" "}
                {destination.beds}
              </div>
              <div>
                <span className="font-medium">Bathrooms:</span>{" "}
                {destination.baths}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="sticky top-4">
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold">${destination.price}</span>
                <span className="text-gray-600">/night</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-600">Check-in</div>
                  <div>{selectedDates.checkIn}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm text-gray-600">Check-out</div>
                  <div>{selectedDates.checkOut}</div>
                </div>
              </div>

              <div className="border rounded-md p-3 mb-4">
                <div className="text-sm text-gray-600">Number of guests</div>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full mt-1"
                >
                  {Array.from(
                    { length: destination.guests },
                    (_, i) => i + 1
                  ).map((num) => (
                    <option key={num} value={num}>
                      {num} guests
                    </option>
                  ))}
                </select>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Reserve
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
