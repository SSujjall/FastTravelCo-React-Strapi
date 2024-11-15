/* eslint-disable react/prop-types */
const Info = ({ destination }) => {
  return (
    <div className="info-container">
      <div className="flex justify-between mb-6">
        <div className="upper-item">
          <p className="flex gap-2">
            <span className="material-symbols-outlined">location_on</span>
            {destination.location}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {destination.guests} guests • {destination.beds} bedrooms •{" "}
            {destination.baths} bathrooms
          </p>
        </div>

        <div className="w-100 flex justify-end items-center">
          <span className="text-2xl font-bold">${destination.price}</span>
          <span className="text-gray-600 text-sm">&nbsp;/night</span>
        </div>
      </div>

      <div className="text-sm">{destination.description}</div>
    </div>
  );
};

export default Info;
