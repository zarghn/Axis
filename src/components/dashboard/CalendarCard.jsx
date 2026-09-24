import React, { useState } from "react";

function CalendarCard() {
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const shortYear = year.toString().slice(-2);

  const monthName = currentDate
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();

  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(year, currentDate.getMonth() + 1, 0);

  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const totalDays = lastDayOfMonth.getDate();
  const prevMonthLastDay = new Date(year, currentDate.getMonth(), 0).getDate();
  const prevMonthDays = [];
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push({ day: prevMonthLastDay - i, currentMonth: false });
  }

  const currentMonthDays = [];
  for (let i = 1; i <= totalDays; i++) {
    currentMonthDays.push({
      day: i < 10 ? `0${i}` : `${i}`,
      currentMonth: true,
      isToday:
        i === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        year === new Date().getFullYear(),
    });
  }

  const allDays = [...prevMonthDays, ...currentMonthDays];
  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  return (
    <div className="bg-[#FFF8E7] rounded-[32px] p-4 flex flex-col justify-between w-full h-full select-none box-border">
      <div className="bg-white rounded-[24px] w-full h-full flex flex-col justify-between overflow-hidden shadow-xs pb-3">
        <div>
          <div className="bg-[#FFE885] py-2.5 px-4 flex items-center justify-center w-full mb-2">
            <h3 className="text-lg font-black tracking-widest text-neutral-900 font-sans uppercase m-0 flex items-center gap-1.5">
              <span>{monthName}</span>
              <span className="text-xs font-extrabold opacity-70">'{shortYear}</span>
            </h3>
          </div>

          {/* DAYS OF WEEK */}
          <div className="grid grid-cols-7 text-center py-2 px-3">
            {daysOfWeek.map((day, idx) => (
              <span
                key={day}
                className={`text-[10px] font-extrabold tracking-wider ${
                  idx >= 5 ? "text-[#FF8A00]" : "text-neutral-400"
                }`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 text-center px-3 gap-y-3 my-auto">
          {allDays.map((item, index) => {
            const isWeekend = index % 7 === 5 || index % 7 === 6;

            return (
              <span
                key={index}
                className={`text-xs transition-all duration-200 flex items-center justify-center mx-auto w-6 h-6 rounded-full ${
                  item.isToday
                    ? "bg-neutral-900 text-white font-bold shadow-xs"
                    : !item.currentMonth
                    ? "text-neutral-300"
                    : isWeekend
                    ? "text-[#FF8A00] font-semibold"
                    : "text-neutral-800 font-semibold"
                }`}
              >
                {item.day}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarCard;