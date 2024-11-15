/* eslint-disable react/prop-types */
const ImageGallery = ({
  destination,
  activeImageIndex,
  setActiveImageIndex,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border">
      {/* Left Column - Main Image */}
      <div className="col-span-2">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={destination.images[activeImageIndex]}
            alt={destination.location}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Right Column - Thumbnail Grid */}
      <div className="grid grid-cols-3 col-span-2 gap-2">
        {destination.images.map((image, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={image}
              alt={`${destination.location} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
