import { Button } from "./Button"; // import your Button component

const SearchSection = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        Your Next Destination Awaits
      </h2>
      <div className="max-w-7xl mx-auto p-3 bg-white border border-slate-100 shadow-lg rounded-lg">
        <div className="flex justify-between items-center font-semibold">
          {/* Section 1 */}
          <div className="flex items-center space-x-2">
            <span className="material-icons">location_on</span>
            <span>Where is your next destination?</span>
          </div>

          <div className="hidden sm:block mx-4 h-16 border-l border-gray-400"></div>

          {/* Section 2 (Hidden on mobile) */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="material-icons">calendar_today</span>
            <span>Check in Date - Check out Date</span>
          </div>

          <div className="hidden sm:block mx-4 h-16 border-l border-gray-400"></div>

          {/* Section 3 (Hidden on mobile) */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="material-icons">people</span>
            <span>No. of guests</span>
          </div>

          {/* Search Button */}
          <div className="flex items-center space-x-2">
            <Button
              text="Search"
              onClick={() => console.log("Search clicked")}
              icon="search"
              className="bg-black text-white hover:bg-slate-600 w-auto min-w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;