import React, { useEffect, useRef, useState } from "react";

function TimeTracker({
  completedSessions,
  setCompletedSessions,
  selectedTaskId,
  setSelectedTaskId,
  projects = [],
}) {
  const [seconds, setSeconds] = useState(3600);
  const [isRunning, setIsRunning] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const startSecondsRef = useRef(3600);
  const allTasks = projects.flatMap((project) => project.tasks || []);
  const selectedTask = allTasks.find((task) => task.id === selectedTaskId);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          const elapsedSeconds = startSecondsRef.current - prevSeconds + 1;
          clearInterval(interval);
          setIsRunning(false);

          const todayStr = new Date().toISOString().split("T")[0];
          setCompletedSessions((prevSessions) => [
            ...prevSessions,
            {
              date: todayStr,
              totalMinutes: Math.floor(elapsedSeconds / 60),
            },
          ]);

          return 3600;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, setCompletedSessions]);

  function handleStart() {
    if (isRunning) return;
    startSecondsRef.current = seconds;
    setIsRunning(true);
  }

  function handlePause() {
    if (!isRunning) return;
    const elapsedSeconds = startSecondsRef.current - seconds;
    const todayStr = new Date().toISOString().split("T")[0];

    setCompletedSessions((prevSessions) => [
      ...prevSessions,
      {
        date: todayStr,
        totalMinutes: Math.floor(elapsedSeconds / 60),
      },
    ]);

    setIsRunning(false);
  }

  function handleReset() {
    setSeconds(3600);
    setIsRunning(false);
  }

  const progressPercentage = ((3600 - seconds) / 3600) * 100;
  const strokeDashoffset = 276.46 - (276.46 * progressPercentage) / 100;

  return (
    <div className="w-full max-w-[280px] bg-[#FFFDF5] rounded-[32px] p-6 flex flex-col items-center shadow-xs font-sans">
      {/* Timer Circle */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="36" fill="#ffffff" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="5"
            strokeDasharray="0.8 1.8"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#FFE885"
            strokeWidth="12"
            strokeDasharray="276.46"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>

        <div className="absolute text-center pointer-events-none">
          <p className="text-3xl font-bold text-neutral-900 leading-none tracking-tight">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
          </p>
          <span className="text-xs text-neutral-400 mt-1 block">work time</span>
        </div>
      </div>

      {/* Controls Row */}
      <div className="w-full flex items-center justify-between gap-2">
        {/* Task Dropdown */}
        <div className="relative flex-1">
          <div
            onClick={() => setIsTaskOpen((prev) => !prev)}
            className="bg-white px-3 py-2 rounded-full flex items-center justify-between text-xs text-neutral-700 cursor-pointer shadow-xs border border-neutral-100"
          >
            <span className="truncate">{selectedTask ? selectedTask.title : "select task"}</span>
            <svg className="w-3.5 h-3.5 text-neutral-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>

          {isTaskOpen && (
            <div className="absolute left-0 right-0 top-10 bg-white border border-neutral-100 rounded-2xl shadow-lg max-h-32 overflow-y-auto z-20 p-1">
              {allTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setIsTaskOpen(false);
                  }}
                  className="w-full text-left text-xs px-3 py-1.5 hover:bg-amber-50 rounded-lg text-neutral-700 transition"
                >
                  {task.title}
                </button>
              ))}
              {allTasks.length === 0 && (
                <p className="text-[10px] text-neutral-400 p-2 text-center">No tasks available</p>
              )}
            </div>
          )}
        </div>

        {/* Buttons Group */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleStart}
            aria-label="Start"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-xs hover:bg-neutral-50 active:scale-95 transition"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handlePause}
            aria-label="Pause"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-xs hover:bg-neutral-50 active:scale-95 transition"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-xs hover:bg-neutral-50 active:scale-95 transition"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeTracker;