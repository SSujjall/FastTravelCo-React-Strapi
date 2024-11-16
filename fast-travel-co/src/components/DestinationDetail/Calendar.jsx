/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ unavailableDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the next month's date
  const getNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  };

  // Generate calendar data for a specific month
  const generateMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const weeks = [];
    let currentWeek = Array(7).fill(null);

    // Fill in empty days at the start
    for (let i = 0; i < startingDay; i++) {
      currentWeek[i] = "";
    }

    // Fill in the days
    for (let day = 1; day <= totalDays; day++) {
      const weekDay = (startingDay + day - 1) % 7;
      currentWeek[weekDay] = day;

      if (weekDay === 6 || day === totalDays) {
        weeks.push([...currentWeek]);
        currentWeek = Array(7).fill(null);
      }
    }

    return weeks;
  };

  // Check if a date is unavailable
  const isDateUnavailable = (year, month, day) => {
    const date = new Date(year, month, day);
    return unavailableDates.some(
      ({ checkInDate, checkOutDate }) =>
        date >= new Date(checkInDate) && date <= new Date(checkOutDate)
    );
  };

  // Format month name
  const formatMonth = (date) => {
    return date.toLocaleString("default", { month: "long" }).toUpperCase();
  };

  // Navigation handlers
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="flex gap-8 mt-4 shadow-xl border border-gray-200 rounded p-5">
      {/* Current Month Calendar */}
      <div className=" rounded-lg p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium">
            {formatMonth(currentDate)} {currentDate.getFullYear()}
          </div>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-xs text-center text-gray-500 font-medium"
            >
              {day}
            </div>
          ))}

          {generateMonthData(currentDate).map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              const isUnavailable =
                day &&
                isDateUnavailable(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                );

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`
                    text-center py-2 text-sm
                    ${day ? "hover:bg-gray-50 rounded-full" : ""}
                    ${
                      isUnavailable
                        ? "bg-red-50 text-red-500 line-through cursor-not-allowed"
                        : day
                        ? "cursor-pointer"
                        : ""
                    }
                  `}
                >
                  {day}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Next Month Calendar */}
      <div className="rounded-lg p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8" /> {/* Spacer for alignment */}
          <div className="text-sm font-medium">
            {formatMonth(getNextMonth())} {getNextMonth().getFullYear()}
          </div>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-xs text-center text-gray-500 font-medium"
            >
              {day}
            </div>
          ))}

          {generateMonthData(getNextMonth()).map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              const isUnavailable =
                day &&
                isDateUnavailable(
                  getNextMonth().getFullYear(),
                  getNextMonth().getMonth(),
                  day
                );

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`
                    text-center py-2 text-sm
                    ${day ? "hover:bg-gray-50 rounded-full" : ""}
                    ${
                      isUnavailable
                        ? "bg-red-50 text-red-500 line-through cursor-not-allowed"
                        : day
                        ? "cursor-pointer"
                        : ""
                    }
                  `}
                >
                  {day}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
