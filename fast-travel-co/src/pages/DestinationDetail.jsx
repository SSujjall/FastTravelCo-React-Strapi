/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Share2, Heart, Play } from "lucide-react";
import { destinationService } from "../services/Api";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import { Button } from "../components/Button";
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

  // Mapping amenities to icons -- Names must match with strapi's table attributes
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

  return (
    <div className="max-w-[1800px] px-8 mx-auto">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border">
        {/* Left Column - Main Image */}
        <div className="md:col-span-2">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={destination.images[activeImageIndex]}
              alt={destination.location}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Right Column - Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-2 md:block">
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

      {/* Destination Title and Action Buttons */}
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

      {/* Property Details and Booking Card */}
      <div className="grid md:grid-cols-3 gap-8 border mt-6">
        <div className="col-span-2">
          <div className="flex justify-between mb-6">
            <div>
              <p className="flex gap-2">
                <span className="material-symbols-outlined">location_on</span>
                {destination.location}
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

          {/* Amenities Section */}
          <div className="mt-6">
            <h3 className="font-bold text-xl">Popular Amenities</h3>
            <ul className="mt-3 grid grid-cols-2 gap-6 max-w-[600px]">
              {destination.amenities && destination.amenities.length > 0 ? (
                destination.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    {amenityIcons[amenity.Name] || null}
                    <span className="ml-2">{amenity.Name}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">
                  No amenities available.
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Booking Card */}
        <div className="col-span-1 shadow-lg max-w-[450px] ml-auto">
          <Card>
            <CardContent>
              <section className="flex justify-center items-center mb-6">
                <span className="text-2xl font-bold">Book Now</span>
              </section>

              <section className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div className="grid grid-cols-1">
                  <span className="text-base font-semibold">Check-in</span>
                  <div className="border rounded-md p-3">
                    <div>{selectedDates.checkIn}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <span className="text-base font-semibold">Check-out</span>
                  <div className="border rounded-md p-3">
                    <div>{selectedDates.checkOut}</div>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 mb-4">
                <span className="text-base font-semibold">No. of guests</span>
                <div className="border rounded-md p-3">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full mt-1 outline-none"
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
              </section>

              <section className="grid grid-cols-1 mb-4">
                <span className="text-base font-semibold">Phone Number</span>
                <div className="flex items-center border rounded-md p-3">
                  <select className="outline-none text-sm mr-3 p-2 w-2/4">
                    <option value="+977">Nepal +977</option>
                    <option value="+977">NewZealand +64</option>
                    <option value="+44">UK +44</option>
                    <option value="+91">India +91</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-3/4 p-2 outline-none"
                  />
                </div>
              </section>

              <section className="grid grid-cols-1 mb-4">
                <span className="text-base font-semibold">Note (optional)</span>
                <textarea
                  className="border rounded-md p-3 outline-none"
                  rows={5}
                  placeholder="Message Here"
                ></textarea>
              </section>

              <Button
                text="Reserve"
                icon=""
                className="bg-black text-white py-2 px-4 rounded hover:bg-slate-600"
              />
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        {destination.reviews && destination.reviews.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-xl">Reviews</h3>
            <ul>
              {destination.reviews.map((review, index) => (
                <li key={index} className="my-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      Rating: {review.Rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      by {review.user}
                    </span>{" "}
                    {/* Display the user */}
                  </div>
                  <p className="text-sm text-gray-500">{review.Comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetail;
