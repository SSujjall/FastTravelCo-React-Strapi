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
