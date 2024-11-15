/* eslint-disable react/prop-types */
import {
  AirVent,
  Wifi,
  CookingPot,
  MonitorCheck,
  Waves,
  Dock,
  HandPlatter,
  BoomBox,
  BaggageClaim,
} from "lucide-react";

// Mapping amenities to icons
const amenityIcons = {
  "Air Conditioning": <AirVent className="text-gray-500" />,
  "Fast Wifi": <Wifi className="text-gray-500" />,
  "Equipped Kitchen": <CookingPot className="text-gray-500" />,
  "Dedicated Workspace": <MonitorCheck className="text-gray-500" />,
  "Hot Water": <Waves className="text-gray-500" />,
  "Drying Rack": <Dock className="text-gray-500" />,
  "Dining Table": <HandPlatter className="text-gray-500" />,
  "Cleaning during stay": <BoomBox className="text-gray-500" />,
  "Luggage Dropoff": <BaggageClaim className="text-gray-500" />,
};

const AmenitiesList = ({ amenities }) => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-xl">Popular Amenities</h3>
      <ul className="mt-3 grid grid-cols-2 gap-6 max-w-[600px]">
        {amenities && amenities.length > 0 ? (
          amenities.map((amenity, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              {amenityIcons[amenity.Name] || null}
              <span className="ml-2">{amenity.Name}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">No amenities available.</li>
        )}
      </ul>
    </div>
  );
};

export default AmenitiesList;
