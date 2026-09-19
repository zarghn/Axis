import React, { useState, useMemo } from "react";
import trashIcon from "../../../assets/icons/trash.png";
import pencilIcon from "../../../assets/icons/pencil.png";
import beforeIcon from "../../../assets/icons/after.png";
import afterIcon from "../../../assets/icons/before.png";

// calender logic

const WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const MONTH_NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function getCalendarCells(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  const cells = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  let trailing = 1;
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({ day: trailing++, inMonth: false });
  }

  return cells;
}

export default function AddProject({ onClose, onAddProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [viewYear, setViewYear] = useState(2025);
  const [viewMonth, setViewMonth] = useState(5);
  const [selectedDate, setSelectedDate] = useState({
    year: 2025,
    month: 5,
    day: 11,
  });

  const cells = useMemo(
    () => getCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (cell) => {
    if (!cell.inMonth) return;
    setSelectedDate({ year: viewYear, month: viewMonth, day: cell.day });
  };

  const handleAddProject = () => {
    const payload = { title, description, date: selectedDate, tasks: [] };
    console.log("New project:", payload);
    onAddProject(payload);
    onClose?.();
  };

  const isSelected = (cell) =>
    cell.inMonth &&
    selectedDate.year === viewYear &&
    selectedDate.month === viewMonth &&
    selectedDate.day === cell.day;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-5xl bg-white rounded-[35px] md:rounded-[55px] p-6 sm:p-8 md:p-14 shadow-2xl max-h-[95vh] overflow-y-auto md:overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          {/* LEFT COLUMN - TITLE & DESCRIPTION */}
          <div className="flex flex-col gap-5 md:gap-6 h-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TITLE ..."
              className="w-full h-14 md:h-16 px-6 bg-[#e5e5e5] rounded-2xl text-neutral-600 placeholder:text-neutral-400 font-medium text-base md:text-lg focus:outline-none transition"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description ..."
              className="w-full h-60 md:h-auto md:flex-1 md:min-h-[320px] p-6 bg-[#e5e5e5] rounded-3xl text-neutral-600 placeholder:text-neutral-400 font-medium text-base md:text-lg resize-none focus:outline-none transition"
            />
          </div>

          {/* RIGHT COLUMN - CALENDAR & BUTTONS */}
          <div className="flex flex-col justify-between items-center w-full">
            <div className="w-full flex flex-col items-center">
              {/* Header: Month and Year */}
              <div className="flex items-center justify-center gap-4 my-2 md:mb-5">
                <button
                  type="button"
                  onClick={goToPrevMonth}
                  aria-label="Previous month"
                  className="hover:opacity-80 transition active:scale-90"
                >
                  <img
                    src={afterIcon}
                    alt="forward"
                    className="w-6 h-6 md:w-4 md:h-4"
                  />
                </button>

                <h3 className="font-serif text-2xl md:text-2xl font-bold text-neutral-700 tracking-wide">
                  {viewYear} / {MONTH_NAMES[viewMonth]}
                </h3>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="hover:opacity-80 transition active:scale-90"
                >
                  <img
                    src={beforeIcon}
                    alt="back"
                    className="w-6 h-6 md:w-4 md:h-4"
                  />
                </button>
              </div>

              {/* CALENDAR */}
              <div className="bg-[#fffdf0] p-5 rounded-3xl w-full max-w-[360px]">
                <div className="grid grid-cols-7 gap-y-3 text-center">
                  {WEEKDAYS.map((wd, i) => (
                    <div
                      key={wd}
                      className={`text-xs font-bold ${
                        i >= 5 ? "text-orange-400" : "text-neutral-600"
                      }`}
                    >
                      {wd}
                    </div>
                  ))}

                  {cells.map((cell, idx) => {
                    const weekdayIdx = idx % 7;
                    const isWeekend = weekdayIdx >= 5;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleSelectDay(cell)}
                        disabled={!cell.inMonth}
                        className={[
                          "mx-auto w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold transition",
                          !cell.inMonth ? "text-amber-200 cursor-default" : "",
                          cell.inMonth && isWeekend ? "text-orange-400" : "",
                          cell.inMonth && !isWeekend ? "text-neutral-700" : "",
                          isSelected(cell)
                            ? "bg-[#FEEA9A] text-neutral-800 font-bold shadow-sm"
                            : "",
                          cell.inMonth && !isSelected(cell)
                            ? "hover:bg-[#FEEA9A]/30"
                            : "",
                        ].join(" ")}
                      >
                        {String(cell.day).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-3 w-full max-w-[360px] mt-6 md:mt-12">
              <button
                type="button"
                onClick={handleAddProject}
                className="flex-1 md:flex-none px-6 md:px-8 py-3.5 md:py-2 bg-[#FEEA9A] text-white font-serif rounded-full font-bold text-base md:text-lg hover:opacity-90 transition shadow-sm active:scale-95 text-center"
              >
                Add Project
              </button>

              <button
                type="button"
                aria-label="Edit"
                className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-[#FEEA9A] p-1 flex items-center justify-center shrink-0 hover:opacity-90 transition shadow-sm active:scale-95"
              >
                <img
                  src={pencilIcon}
                  alt="Edit"
                  className="w-5 h-5 brightness-0 invert"
                />
              </button>

              <button
                type="button"
                aria-label="Delete"
                className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-[#FEEA9A] p-1 flex items-center justify-center shrink-0 hover:opacity-90 transition shadow-sm active:scale-95"
              >
                <img
                  src={trashIcon}
                  alt="Delete"
                  className="w-5 h-5 brightness-0 invert"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
