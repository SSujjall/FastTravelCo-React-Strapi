import {
  heroImages,
  destinations,
  landmarks,
  testimonials,
} from "../Utils/constants";

const InfoSection = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className=" px-8 py-12 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h2 className="text-3xl font-bold mb-4">
              Enjoy Awesome Time With Your Family
              <div className="border-2 border-b w-24 border-red-500" />
            </h2>

            <p className="text-gray-600 text-xl mb-6">
              Create unforgettable memories with your family on an adventure
              designed for all ages! Discover stunning landscapes, engaging
              activities, and delightful accommodations that cater to every
              family member. Whether you&apos;re looking to relax on serene
              beaches, explore historic cities, or dive into outdoor thrills,
              our tours are crafted to bring your family closer while
              experiencing the best each destination has to offer. Join us for a
              journey filled with joy, laughter, and the promise of lasting
              moments together!
            </p>
          </div>

          <div className="w-full md:w-1/2 relative h-[600px] flex items-center">
            {/* Overlapping hero images */}
            <div className="relative w-full h-full">
              <img
                src={heroImages[0].image}
                alt="beach couple"
                className="absolute top-0 right-1/4 w-2/3 h-80 lg:h-[500px] lg:w-2/4 object-cover rounded-lg shadow-lg transform translate-y-[40px] lg:translate-y-[0px] lg:translate-x-[-20%]"
              />
              <img
                src={heroImages[1].image}
                alt="mountains"
                className="absolute bottom-0 left-1/4 w-2/3 h-80 lg:h-[500px] lg:w-2/4 object-cover rounded-lg shadow-lg transform translate-y-[-40px] lg:translate-y-[0px] lg:translate-x-[50%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Notch Destination */}
      <section className="py-12 px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Top Notch Destination
            <div className="border-2 border-b w-36 border-red-500 mx-auto" />
          </h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Thailand - Large tile */}
            <div className="col-span-12 md:col-span-4 relative group overflow-hidden rounded-lg">
              <img
                src={destinations[0].image}
                alt="Thailand cityscape"
                className="w-full lg:h-[600px] h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                  THAILAND
                </span>
              </div>
            </div>

            {/* Norway - Large tile */}
            <div className="col-span-12 md:col-span-4 relative group overflow-hidden rounded-lg">
              <img
                src={destinations[1].image}
                alt="Norway fjord"
                className="w-full lg:h-[600px] h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                  NORWAY
                </span>
              </div>
            </div>

            {/* Right column with two smaller tiles */}
            <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
              <div className="relative group overflow-hidden rounded-lg mb-2">
                <img
                  src={destinations[2].image}
                  alt="Nepal mountains"
                  className="w-full h-[190px] lg:h-[290px] object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                    NEPAL
                  </span>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg">
                <img
                  src={destinations[3].image}
                  alt="Singapore night"
                  className="w-full h-[190px] lg:h-[290px] object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                    SINGAPORE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-8 mt-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Satisfied travellers around the world
            <div className="border-2 border-b w-36 border-red-500 mx-auto" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {/* Profile Picture */}
                  <img
                    src={testimonial.profilePicture} // Assuming you have a profile picture URL in the testimonial data
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    loading="lazy"
                  />
                  <p className="font-medium">{testimonial.author}</p>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Planners */}
      <section className="py-12 px-8 mt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex mb-8 flex-col justify-center">
              <h2 className="text-3xl">
                We Are Professional <b>Planners For You</b>
                <div className="border-b border-2 border-red-500 w-3/4 mb-5"></div>
              </h2>
              discover your ideal experience with us.
              <a href="#" className="text-red-500 mt-5 font-bold">
                View More→
              </a>
            </div>
            {landmarks.map((landmark, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={landmark.image}
                  alt={landmark.name}
                  className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
