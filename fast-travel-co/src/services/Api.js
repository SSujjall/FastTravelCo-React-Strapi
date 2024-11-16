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
      ],
    };

    // Apply search criteria as query filters
    if (searchCriteria.location) {
      params["filters[Location][$contains]"] = searchCriteria.location;
    }
    if (searchCriteria.guests) {
      params["filters[NumberOfGuests][$gte]"] = searchCriteria.guests;
    }
    if (searchCriteria.checkIn) {
      params["filters[check_in][$lte]"] = searchCriteria.checkIn;
    }
    if (searchCriteria.checkOut) {
      params["filters[check_out][$gte]"] = searchCriteria.checkOut;
    }

    // API call
    const response = await axios.get(`${API_BASE_URL}/api/destinations`, {
      params,
    });

    // Transform response data
    return response.data.data.map((item) => {
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
        reviews: reviews.map((review) => {
          const user = review.users_permissions_user
            ? review.users_permissions_user.username
            : "Anonymous";
          return {
            ...review,
            user,
          };
        }),
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
