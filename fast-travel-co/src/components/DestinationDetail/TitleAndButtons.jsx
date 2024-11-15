/* eslint-disable react/prop-types */

const TitleAndButtons = ({ destination }) => {
  return (
    <div className="border flex justify-between mt-8">
      <div className="w-2/3 border">
        <h1 className="text-2xl font-bold">{destination.title}</h1>
      </div>
      <div className="flex lg:flex-row flex-col justify-end items-center gap-2 border w-1/3">
        <a
          href=""
          className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm min-w-[126px]"
        >
          <span className="material-symbols-outlined text-base">map</span>
          <span>View in map</span>
        </a>

        <a
          href=""
          className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm"
        >
          <span className="material-symbols-outlined text-base">favorite</span>
          <span>Save</span>
        </a>

        <a
          href=""
          className="flex items-center border px-2 py-1 gap-1 rounded-lg text-sm"
        >
          <span className="material-symbols-outlined text-base">share</span>
          <span>Share</span>
        </a>
      </div>
    </div>
  );
};

export default TitleAndButtons;
