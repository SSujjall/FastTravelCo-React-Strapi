/* eslint-disable react/prop-types */
import { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { authService } from "../../services/Auth";
import { getUserDetails } from "../../services/Api";
import { createPaymentAndBooking } from "../../services/Api";
import { Button } from "../../components/Shared/Button";
import StarRating from "../../components/Shared/StarRating";
import { toast } from "react-toastify";

const PaymentMethod = ({ method, selected, onChange }) => (
  <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
    <input
      type="radio"
      name="paymentMethod"
      value={method.value}
      checked={selected === method.value}
      onChange={() => onChange(method.value)}
      className="h-4 w-4"
    />
    <div className="flex flex-col">
      <span className="font-medium">{method.label}</span>
      <span className="text-sm text-gray-500">{method.description}</span>
    </div>
  </label>
);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationData = location.state;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  if (!reservationData) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            No Reservation Data Found
          </h2>
          <p className="text-gray-600 mb-4">
            Please go back and make a reservation first.
          </p>
          <Button
            onClick={() => navigate("/")}
            text="Return to Home"
            className="bg-black text-white"
          />
        </div>
      </div>
    );
  }

  const paymentMethods = [
    {
      value: "Online",
      label: "Pay Online",
      description: "Secure payment via credit/debit card or digital wallet",
    },
    {
      value: "COD",
      label: "Cash on Arrival",
      description: "Pay in cash when you arrive at the property",
    },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch the logged-in user's details
      const user = await getUserDetails(authService.getToken());

      const paymentData = {
        amount: reservationData.amount,
        paymentMethod: paymentMethod,
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut,
        guests: reservationData.guests,
        note: reservationData.note,
        destinationDocumentId: reservationData.destinationId, // Use documentId instead of id
        userId: user.documentId, // Use documentId instead of userId
      };

      // Create payment and booking
      await createPaymentAndBooking(paymentData, authService.getToken());

      toast.success("Payment successful! Your booking has been confirmed.");

      navigate("/myBookings", {
        state: {
          ...reservationData,
          paymentMethod,
        },
      });
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto px-4 md:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Payment Section */}
        <div className="order-2 md:order-1 max-w-[600px]">
          <h1 className="text-4xl font-bold mb-6">Confirm and Pay</h1>
          <h2 className="text-lg font-semibold mb-4">Pay with:</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <PaymentMethod
                key={method.value}
                method={method}
                selected={paymentMethod}
                onChange={setPaymentMethod}
              />
            ))}
          </div>

          {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}

          <Button
            onClick={handlePayment}
            disabled={loading}
            text={loading ? "Processing..." : "Complete Booking"}
            className="w-full mt-6 bg-black text-white py-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
          />
        </div>

        {/* Summary Section */}
        <div className="order-1 md:order-2 xl:max-w-[650px] ml-auto">
          <div className="border rounded-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-full sm:w-1/2">
                <img
                  src={reservationData.image}
                  alt={reservationData.destinationTitle}
                  className="w-full h-[250px] sm:h-[200px] object-cover rounded-lg"
                />
              </div>
              <div className="w-full sm:w-1/2 space-y-2">
                <h3 className="font-semibold text-xl">
                  {reservationData.destinationTitle}
                </h3>
                <div className="flex gap-1 items-center">
                  <span className="material-symbols-outlined text-gray-600">
                    location_on
                  </span>
                  <p className="text-gray-600">{reservationData.location}</p>
                </div>
                {/* Add StarRating component here */}
                <div className="flex items-center gap-1">
                  <span className="text-gray-600 font-semibold">
                    {reservationData.rating}
                  </span>
                  <StarRating rating={reservationData.rating} />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates</span>
                  <span className="font-medium">
                    {formatDate(reservationData.checkIn)} -{" "}
                    {formatDate(reservationData.checkOut)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">
                    {reservationData.guests} guests
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <h3 className="font-semibold mb-4">Price Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    ${reservationData.pricePerNight} ×{" "}
                    {reservationData.numberOfNights} nights
                  </span>
                  <span className="font-medium">
                    ${reservationData.subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="font-medium">
                    ${reservationData.serviceFee}
                  </span>
                </div>
                <div className="border-t mt-2 pt-2">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Total</span>
                    <span className="font-bold text-xl">
                      ${reservationData.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
