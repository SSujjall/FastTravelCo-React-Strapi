import axios from 'axios';

const API_BASE_URL = "http://localhost:1337"; // Set the base URL for your Strapi API

export const destinationService = {
  async getDestinations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/destinations?populate=Images`);

      // Transform the data to match the component's expected format
      return response.data.data.map(item => ({
        id: item.id,
        type: item.Type.toLowerCase(),
        location: item.Location,
        price: parseInt(item.PricePerNight),
        beds: item.NumberOfBedrooms,
        baths: item.NumberOfBathrooms,
        guests: item.NumberOfGuests,
        rating: 4.5, // Default rating since it's not in the API
        images: item.Images?.map(image => `${API_BASE_URL}${image.url}`) // Access the `url` field in the Images array
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  }
};

