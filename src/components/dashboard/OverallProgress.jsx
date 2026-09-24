import React from "react";

function getWeekStart(date) {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = day === 6 ? 0 : -(day + 1);

  currentDate.setDate(currentDate.getDate() + diff);
  currentDate.setHours(0, 0, 0, 0);

  return currentDate;
}

function getDayLabel(date) {
  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  return labels[date.getDay()];
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSessionMinutesForDate(completedSessions, date) {
  const dateKey = getDateKey(date);
  return completedSessions.reduce((total, session) => {
    if (session.date === dateKey) {
      return total + session.totalMinutes;
    }
    return total;
  }, 0);
}

function getTotalMinutesForWeek(completedSessions, weekStart) {
  return completedSessions.reduce((total, session) => {
    const sessionDate = new Date(`${session.date}T00:00:00`);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    if (sessionDate >= weekStart && sessionDate < weekEnd) {
      return total + session.totalMinutes;
    }
    return total;
  }, 0);
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

function OverallProgress({ completedSessions = [] }) {
  const today = new Date();
  const todayMinutes = getSessionMinutesForDate(completedSessions, today);

  const thisWeekStart = getWeekStart(today);
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const thisWeekMinutes = getTotalMinutesForWeek(
    completedSessions,
    thisWeekStart,
  );
  const lastWeekMinutes = getTotalMinutesForWeek(
    completedSessions,
    lastWeekStart,
  );
  const weeklyDifference = thisWeekMinutes - lastWeekMinutes;

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(thisWeekStart);
    date.setDate(thisWeekStart.getDate() + index);
    const minutes = getSessionMinutesForDate(completedSessions, date);

    return {
      date,
      day: getDayLabel(date),
      minutes,
    };
  });

  const maxMinutes = Math.max(...days.map((day) => day.minutes), 60);

  return (
    <div className="w-full max-w-[320px] bg-[#FFF8E7] p-6 rounded-[32px] shadow-xs font-sans select-none flex flex-col justify-between h-full min-h-[280px]">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-neutral-800 text-base font-semibold tracking-tight">
          Overall Progress
        </h3>
        <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          {weeklyDifference >= 0 ? "+" : "-"}
          {formatTime(Math.abs(weeklyDifference))}
        </span>
      </div>

      <div className="relative flex justify-between items-end h-39 pt-6 pb-2">
        {/* DASH LINE */}
        <div className="absolute top-1/2 left-0 w-full border-b border-dashed border-neutral-200/80 pointer-events-none" />

        {days.map((item) => {
          const isToday = getDateKey(item.date) === getDateKey(today);
          const barHeight = Math.max(
            16,
            Math.round((item.minutes / maxMinutes) * 110),
          );

          return (
            <div
              key={getDateKey(item.date)}
              className="relative flex flex-col items-center group h-full justify-end"
            >
              {/* TODAY BADGE */}
              {isToday && (
                <div className="absolute -top-6 bg-[#FFE885] text-neutral-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap z-10">
                  {`${Math.floor(todayMinutes / 60)}h ${todayMinutes % 60}m`}
                </div>
              )}

              {/* BAR */}
              <div
                style={{ height: `${barHeight}px` }}
                className={`w-1.5 rounded-full z-0 transition-all duration-300 ${
                  isToday
                    ? "bg-[#FFE885]"
                    : item.minutes > 0
                      ? "bg-neutral-800"
                      : "bg-neutral-300/80"
                }`}
              />

              {/* DOTS */}
              <div className="w-1.5 h-1.5 rounded-full mt-3 mb-1 bg-neutral-800" />

              {/* DAY DOTS */}
              <span className="text-neutral-600 text-xs font-medium">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OverallProgress;
