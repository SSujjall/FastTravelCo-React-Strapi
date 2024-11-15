import { useLocation, Navigate } from "react-router-dom"; // Access navigation state
import { authService } from "../services/Auth"; // Check if user is logged in

const Payment = () => {
  const location = useLocation();
  const reservationData = location.state; // Retrieve data passed from DestinationDetail

  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  if (!reservationData) {
    return <div>No reservation data found. Please go back and reserve again.</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <div className="border p-4 rounded">
        <h2 className="text-lg">Reservation Details</h2>
        <p>
          <strong>Destination ID:</strong> {reservationData.destinationId}
        </p>
        <p>
          <strong>Check-in:</strong> {reservationData.checkIn}
        </p>
        <p>
          <strong>Check-out:</strong> {reservationData.checkOut}
        </p>
        <p>
          <strong>Guests:</strong> {reservationData.guests}
        </p>
        {/* Payment integration or form can go here */}
        <button className="bg-black text-white py-2 px-4 rounded hover:bg-slate-600 mt-4">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
