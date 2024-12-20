import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login function
export const login = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/local`, {
      identifier,
      password,
    });

    const { jwt, user } = response.data;
    return { jwt, user };
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};

// Register function
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/local/register`,
      {
        username,
        email,
        password,
      }
    );

    const { jwt, user } = response.data;
    return { jwt, user };
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get Destinations function
export const getDestinations = async (searchCriteria = {}) => {
  try {
    const params = {
      populate: [
        "Images",
        "reviews",
        "reviews.users_permissions_user",
        "amenities",
        "bookings", // Include bookings for availability checks
      ],
    };

    // Add search criteria as query filters
    if (searchCriteria.location) {
      params["filters[Location][$contains]"] = searchCriteria.location;
    }
    if (searchCriteria.guests) {
      params["filters[NumberOfGuests][$gte]"] = searchCriteria.guests;
    }

    // Fetch destinations
    const response = await axios.get(`${API_BASE_URL}/api/destinations`, {
      params,
    });

    const destinations = response.data.data;

    // If dates are provided, exclude destinations with overlapping bookings
    let availableDestinations = destinations;
    if (searchCriteria.checkIn && searchCriteria.checkOut) {
      const searchCheckIn = new Date(searchCriteria.checkIn);
      const searchCheckOut = new Date(searchCriteria.checkOut);

      availableDestinations = destinations.filter((destination) => {
        const bookings = destination.bookings || [];
        const hasOverlap = bookings.some((booking) => {
          const bookingCheckIn = new Date(booking.CheckInDate);
          const bookingCheckOut = new Date(booking.CheckOutDate);
          return (
            searchCheckIn <= bookingCheckOut && searchCheckOut >= bookingCheckIn
          );
        });

        // Exclude destinations with overlapping bookings
        return !hasOverlap;
      });
    }

    // Transform response data
    return availableDestinations.map((item) => {
      const reviews = item.reviews || [];
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((acc, review) => acc + review.Rating, 0) /
            reviews.length
          : 0;

      return {
        id: item.id,
        documentId: item.documentId,
        type: item.Type.toLowerCase(),
        location: item.Location,
        description: item.Description,
        title: item.Title,
        price: parseInt(item.PricePerNight, 10),
        beds: item.NumberOfBedrooms,
        baths: item.NumberOfBathrooms,
        guests: item.NumberOfGuests,
        rating: avgRating,
        images: item.Images?.map((image) => `${API_BASE_URL}${image.url}`),
        amenities: item.amenities || [],
        bookings: item.bookings || [],
        reviews: reviews.map((review) => ({
          ...review,
          user: review.users_permissions_user?.username || "Anonymous",
        })),
      };
    });
  } catch (error) {
    console.error(
      "Error fetching destinations:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/// Fetch logged-in user's details
export const getUserDetails = async (jwt) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data; // Returns the user details
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Submit review function with authentication token
export const submitReview = async (destinationId, reviewText, rating, jwt) => {
  try {
    const user = await getUserDetails(jwt); // Get the current user's details
    const response = await axios.post(
      `${API_BASE_URL}/api/reviews`,
      {
        data: {
          Comment: reviewText,
          Rating: rating,
          destination: destinationId,
          users_permissions_user: user.id, // Associate review with the logged-in user
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data; // Returns the created review data
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId, jwt) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// Create payment and booking
export const createPaymentAndBooking = async (paymentData, jwt) => {
  try {
    // Creating a payment entry first
    const paymentResponse = await axios.post(
      `${API_BASE_URL}/api/payments`,
      {
        data: {
          Amount: paymentData.amount,
          PaymentMethod: paymentData.paymentMethod,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Payment created:", paymentResponse.data.data.documentId);

    // Crete a booking entry right after payment
    const bookingResponse = await axios.post(
      `${API_BASE_URL}/api/bookings`,
      {
        data: {
          CheckInDate: paymentData.checkIn,
          CheckOutDate: paymentData.checkOut,
          NumberOfGuests: paymentData.guests,
          Note: paymentData.note,
          destination: paymentData.destinationDocumentId, // Pass the documentId here
          payment: paymentResponse.data.data.id,
          users_permissions_user: paymentData.userId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("Booking Created: ", bookingResponse.data.data.documentId);

    // In booking, update the payment field
    // booking documentId is used in the url to get the specific booking
    await axios.put(
      `${API_BASE_URL}/api/bookings/${bookingResponse.data.data.documentId}`,
      {
        data: {
          payment: paymentResponse.data.data.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return {
      payment: paymentResponse.data,
      booking: bookingResponse.data,
    };
  } catch (error) {
    console.error("Error creating payment and booking:", error);
    throw error;
  }
};

// Get specific user bookings
export const getBookingsByUser = async (token, userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        // Populate destination relation to get the title and other details
        populate: ["destination", "payment"], // Assuming 'destination' is the relation name in the booking model
        "filters[users_permissions_user][id][$eq]": userId, // Filter bookings by the user ID
      },
    });

    // Return the data with payment and destination details
    return response.data.data.map((booking) => ({
      id: booking.documentId,
      destinationTitle: booking.destination?.Title, // Accessing destination title
      checkIn: booking.CheckInDate,
      checkOut: booking.CheckOutDate,
      status: booking.Status,
      amount: booking.payment?.Amount, // Amount from related payment
      paymentMethod: booking.payment?.PaymentMethod, // Payment method from related payment
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const deleteBooking = async (token, bookingId) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

// Get bookings for a specific destination
export const getUnavailableDatesForDestination = async (
  destinationDocumentId
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
      params: {
        "populate[destination]": true, // Populate destination relation
        "filters[destination][documentId][$eq]": destinationDocumentId, // Filter by destination documentId
      },
    });

    const bookings = response.data.data;

    // Extract the check-in and check-out dates for the bookings
    const unavailableDates = bookings.map((booking) => {
      const checkInDate = new Date(booking.CheckInDate);
      const checkOutDate = new Date(booking.CheckOutDate);
      return { checkInDate, checkOutDate };
    });

    return unavailableDates;
  } catch (error) {
    console.error("Error fetching bookings for destination:", error);
    throw error;
  }
};
