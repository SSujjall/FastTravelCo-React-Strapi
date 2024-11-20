/* eslint-disable react/prop-types */
import { Card } from "../Shared/Card";
import { CardContent } from "../Shared/CardContent";
import { Button } from "../Shared/Button";

const BookingForm = ({
  destination,
  selectedDates,
  guests,
  phoneNumber,
  selectedCountryCode,
  note,
  setGuests,
  setPhoneNumber,
  setSelectedCountryCode,
  setNote,
  handleDateChange,
  handleReserve,
  getInputBorderClass,
}) => {
  return (
    <div className="col-span-1 max-w-[450px] mx-auto lg:ml-auto">
      <Card>
        <CardContent>
          <section className="flex justify-center items-center mb-6">
            <span className="text-2xl font-bold">Book Now</span>
          </section>

          <section className="grid xl:grid-cols-2 grid-cols-1 gap-4 mb-4">
            <div className="grid grid-cols-1">
              <span className="text-base font-semibold">Check-in</span>
              <div
                className={`border rounded-md p-3 ${getInputBorderClass(
                  "dates"
                )}`}
              >
                <input
                  type="date"
                  value={selectedDates.checkIn}
                  onChange={(e) => handleDateChange(e, "checkIn")}
                  placeholder="Select check-in date"
                  className="w-full outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1">
              <span className="text-base font-semibold">Check-out</span>
              <div
                className={`border rounded-md p-3 ${getInputBorderClass(
                  "dates"
                )}`}
              >
                <input
                  type="date"
                  value={selectedDates.checkOut}
                  onChange={(e) => handleDateChange(e, "checkOut")}
                  placeholder="Select check-out date"
                  className="w-full outline-none"
                />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 mb-4">
            <span className="text-base font-semibold">No. of guests</span>
            <div
              className={`border rounded-md p-3 ${getInputBorderClass(
                "guests"
              )}`}
            >
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full mt-1 outline-none"
                required
              >
                {Array.from(
                  { length: destination.guests },
                  (_, i) => i + 1
                ).map((num) => (
                  <option key={num} value={num}>
                    {num} guests
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="grid grid-cols-1 mb-4">
            <span className="text-base font-semibold">Phone Number</span>
            <div
              className={`flex items-center border rounded-md p-2 ${getInputBorderClass(
                "phoneNumber"
              )}`}
            >
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="outline-none text-sm border-r h-full w-2/4"
                required
              >
                <option value="+977">Nepal +977</option>
                <option value="+64">New Zealand +64</option>
                <option value="+44">UK +44</option>
                <option value="+91">India +91</option>
              </select>
              <input
                type="number"
                placeholder="Phone number"
                className="w-3/4 p-2 outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </section>

          <section className="grid grid-cols-1 mb-4">
            <span className="text-base font-semibold">Note (optional)</span>
            <textarea
              className={`border rounded-md p-3 outline-none ${getInputBorderClass(
                "note"
              )}`}
              rows={5}
              placeholder="Message Here"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </section>

          <Button
            text="Reserve"
            icon=""
            onClick={handleReserve}
            className="bg-black text-white py-2 px-4 rounded hover:bg-slate-600"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
