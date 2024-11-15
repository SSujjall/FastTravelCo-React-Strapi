import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const destinationService = {
  async getDestinations(searchCriteria = {}) {
    try {
      const params = {
        populate: ["Images", "reviews", "amenities"], // Always populate images
      };

      // Set query parameters based on search criteria
      if (searchCriteria.location) {
        params["filters[Location][$contains]"] = searchCriteria.location;
      }
      if (searchCriteria.guests) {
        params["filters[NumberOfGuests][$gte]"] = searchCriteria.guests; // Use guests filter with $gte
      }
      if (searchCriteria.checkIn) {
        // Convert check-in date format if needed (ensure it works with your backend)
        params["filters[check_in][$lte]"] = searchCriteria.checkIn; // Filter by check-in date or earlier
      }
      if (searchCriteria.checkOut) {
        params["filters[check_out][$gte]"] = searchCriteria.checkOut; // Filter by check-out date or later
      }

      // Make the API call with the query params
      const response = await axios.get(`${API_BASE_URL}/api/destinations`, {
        params,
      });

      return response.data.data.map((item) => {
        const reviews = item.reviews || [];
        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.Rating, 0) /
              reviews.length
            : 0; // 0 is default reviews

        return {
          id: item.id,
          type: item.Type.toLowerCase(),
          location: item.Location,
          description: item.Description,
          title: item.Title,
          price: parseInt(item.PricePerNight),
          beds: item.NumberOfBedrooms,
          baths: item.NumberOfBathrooms,
          guests: item.NumberOfGuests,
          rating: avgRating,
          images: item.Images?.map((image) => `${API_BASE_URL}${image.url}`),
        };
      });
    } catch (error) {
      console.error("Error fetching destinations:", error);
      throw error;
    }
  },
};