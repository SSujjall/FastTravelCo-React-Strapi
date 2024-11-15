/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinations } from "../services/Api";
import ImageGallery from "../components/DestinationDetail/ImageGallery";
import TitleAndButtons from "../components/DestinationDetail/TitleAndButtons";
import AmenitiesList from "../components/DestinationDetail/AmenitiesList";
import BookingForm from "../components/DestinationDetail/BookingForm";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [guests, setGuests] = useState(2);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+977");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const destinations = await getDestinations();
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

  const handleReserve = () => {
    let formErrors = {};

    // Validation
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      formErrors.dates = "Please select both check-in and check-out dates.";
    }
    if (!phoneNumber) {
      formErrors.phoneNumber = "Phone number is required.";
    }
    if (guests < 1) {
      formErrors.guests = "Number of guests must be at least 1.";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const reservationData = {
        destinationId: id,
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        guests,
        phoneNumber: selectedCountryCode + phoneNumber, // Append the country code to the phone number
        note,
      };
      navigate("/payment", { state: reservationData });
    }
  };

  const handleDateChange = (e, type) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [type]: e.target.value,
    }));
  };

  const getInputBorderClass = (field) => {
    return errors[field] ? "border-red-500" : "border-gray-300";
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!destination) {
    return <div className="text-center py-8">Destination not found</div>;
  }

  return (
    <div className="max-w-[1800px] px-8 mx-auto">
      {/* Main Content */}
      <ImageGallery
        destination={destination}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />

      {/* Destination Title and Action Buttons */}
      <TitleAndButtons destination={destination} />

      {/* Property Details and Booking Card */}
      <div className="grid md:grid-cols-3 gap-8 border">
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
          <AmenitiesList amenities={destination.amenities} />
        </div>

        {/* Booking Card */}
        <BookingForm
          destination={destination}
          selectedDates={selectedDates}
          guests={guests}
          phoneNumber={phoneNumber}
          selectedCountryCode={selectedCountryCode}
          note={note}
          setGuests={setGuests}
          setPhoneNumber={setPhoneNumber}
          setSelectedCountryCode={setSelectedCountryCode}
          setNote={setNote}
          handleDateChange={handleDateChange}
          handleReserve={handleReserve}
          getInputBorderClass={getInputBorderClass}
        />
      </div>
    </div>
  );
};

export default DestinationDetail;
