import { useState, useEffect } from "react";
import { authService } from "../../services/Auth"; // Assuming you have this service for token management
import { getUserDetails, deleteBooking } from "../../services/Api"; // Assuming this gets user details and delete API function
import { getBookingsByUser } from "../../services/Api"; // This fetches bookings by user
import { Button } from "../../components/Shared/Button";
import { toast } from "react-toastify"; // Import toast

// Make sure to import toastify's CSS file in your root app file (usually App.js)
import "react-toastify/dist/ReactToastify.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = authService.getToken(); // Assuming you have a function to get the token
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        // Fetch user details to get the userId or JWT for the request
        const userDetails = await getUserDetails(token);

        const fetchedBookings = await getBookingsByUser(token, userDetails.id);

        setBookings(fetchedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    const token = authService.getToken(); // Get the token to authorize the delete request
    if (!token) {
      setError("You are not logged in.");
      return;
    }

    // Show confirmation dialog before deletion
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!isConfirmed) {
      return; // Do nothing if the user cancels
    }

    try {
      await deleteBooking(token, bookingId); // Call the delete API function
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      ); // Update the state by removing the deleted booking
      toast.success("Booking deleted successfully"); // Show success toast
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to delete the booking.");
      toast.error("Failed to delete the booking."); // Show error toast
    }
  };

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="my-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
      <div className="space-y-6">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">
                {booking.destinationTitle}
              </h2>
              <p className="text-sm text-gray-600">
                {booking.checkIn} - {booking.checkOut}
              </p>
              <div className="flex justify-between mt-4">
                <span className="font-semibold">Total Price</span>
                <span className="font-medium">${booking.amount}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-semibold">Payment Method</span>
                <span>{booking.paymentMethod}</span>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => handleDelete(booking.id)}
                  text={"Delete"}
                  className="bg-red-500 max-w-[150px] text-white py-2 px-4 rounded"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
