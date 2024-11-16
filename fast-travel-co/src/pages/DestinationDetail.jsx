import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinations } from "../services/Api";
import ImageGallery from "../components/DestinationDetail/ImageGallery";
import TitleAndButtons from "../components/DestinationDetail/TitleAndButtons";
import AmenitiesList from "../components/DestinationDetail/AmenitiesList";
import BookingForm from "../components/DestinationDetail/BookingForm";
import Info from "../components/DestinationDetail/Info";
import Reviews from "../components/DestinationDetail/Reviews";
import { getUnavailableDatesForDestination } from "../services/Api";
import Calendar from "../components/DestinationDetail/Calendar";

const DestinationDetail = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [guests, setGuests] = useState(2);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+977");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const destinations = await getDestinations({ documentId });
        const currentDestination = destinations.find(
          (d) => d.documentId === documentId
        );
        setDestination(currentDestination);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch destination details:", error);
        setLoading(false);
      }
    };

    fetchDestination();
  }, [documentId]);

  // Fetch unavailable dates when destination is fetched
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const dates = await getUnavailableDatesForDestination(documentId);
        setUnavailableDates(dates);
      } catch (error) {
        console.error("Error fetching unavailable dates:", error);
      }
    };

    if (destination) {
      fetchUnavailableDates();
    }
  }, [documentId, destination]);

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
      // Calculate number of nights
      const checkInDate = new Date(selectedDates.checkIn);
      const checkOutDate = new Date(selectedDates.checkOut);
      const numberOfNights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      // Calculate total amount
      const totalAmount = numberOfNights * destination.price;

      // Service fee (10% of subtotal)
      const serviceFee = Math.round(totalAmount * 0.1);

      // Total with service fee
      const finalAmount = totalAmount + serviceFee;

      const reservationData = {
        destinationId: documentId,
        destinationTitle: destination.title,
        location: destination.location,
        image: destination.images?.[0],
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        guests,
        phoneNumber: selectedCountryCode + phoneNumber,
        note,
        subtotal: totalAmount,
        serviceFee: serviceFee,
        amount: finalAmount,
        pricePerNight: destination.price,
        numberOfNights,
        rating: destination.rating,
      };
      navigate("/payment", { state: reservationData });
    }
  };

  const handleWriteReview = () => {
    navigate(`/`);
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
      <ImageGallery
        destination={destination}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />

      <TitleAndButtons destination={destination} />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <Info destination={destination} />
          <AmenitiesList amenities={destination.amenities} />

          <h3 className="text-xl font-semibold">Available Date</h3>
          <Calendar unavailableDates={unavailableDates} />
        </div>

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

      <Reviews destination={destination} onWriteReview={handleWriteReview} />
    </div>
  );
};

export default DestinationDetail;
