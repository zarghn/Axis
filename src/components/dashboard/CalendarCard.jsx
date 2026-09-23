import React, { useState } from "react";

function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" }).toUpperCase();

  // محاسبه روزهای ماه جاری
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(year, currentDate.getMonth() + 1, 0);

  // محاسبه روز شروع هفته (دوشنبه به‌عنوان اول هفته مطابق طرح)
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6; // دوشنبه 0، یکشنبه 6

  const totalDays = lastDayOfMonth.getDate();

  // روزهای ماه قبل برای پر کردن ابتدای تقویم
  const prevMonthLastDay = new Date(year, currentDate.getMonth(), 0).getDate();
  const prevMonthDays = [];
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push({ day: prevMonthLastDay - i, currentMonth: false });
  }

  // روزهای ماه جاری
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

  // توابع تعویض ماه
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  return (
    <div className="bg-[#FFFDF3] rounded-[36px] p-6 shadow-sm flex flex-col justify-between w-full h-full min-h-[310px]">
      {/* هدر ماه همراه با فلش‌های تعویض ماه */}
      <div className="bg-[#FFE27A] rounded-2xl py-2 px-2 flex items-center justify-between mb-4 w-full shadow-sm">
        <button
          onClick={handlePrevMonth}
          className="text-neutral-700 hover:text-black font-bold p-1 transition"
          type="button"
        >
          ‹
        </button>
        <h3 className="text-sm font-black tracking-[0.2em] text-neutral-900 font-sans uppercase">
          {monthName} {year}
        </h3>
        <button
          onClick={handleNextMonth}
          className="text-neutral-700 hover:text-black font-bold p-1 transition"
          type="button"
        >
          ›
        </button>
      </div>

      {/* روزهای هفته */}
      <div className="grid grid-cols-7 text-center mb-3">
        {daysOfWeek.map((day) => (
          <span key={day} className="text-[11px] font-bold text-neutral-400 tracking-wider">
            {day}
          </span>
        ))}
      </div>

      {/* روزهای واقعی ماه */}
      <div className="grid grid-cols-7 text-center gap-y-3">
        {allDays.map((item, index) => (
          <span
            key={index}
            className={`text-xs font-medium transition-colors ${
              item.isToday
                ? "bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto font-bold"
                : item.currentMonth
                ? "text-neutral-800 font-semibold"
                : "text-neutral-300"
            }`}
          >
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CalendarCard;