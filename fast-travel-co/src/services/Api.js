import axios from "axios";

const API_BASE_URL = "http://localhost:1337";

export const destinationService = {
  async getDestinations(searchCriteria = {}) {
    try {
      const params = {
        populate: "Images", // Always populate images
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

      // Map response data
      return response.data.data.map((item) => ({
        id: item.id,
        type: item.Type.toLowerCase(),
        location: item.Location,
        price: parseInt(item.PricePerNight),
        beds: item.NumberOfBedrooms,
        baths: item.NumberOfBathrooms,
        guests: item.NumberOfGuests,
        rating: 4.5,
        images: item.Images?.map((image) => `${API_BASE_URL}${image.url}`),
      }));
    } catch (error) {
      console.error("Error fetching destinations:", error);
      throw error;
    }
  },
};
