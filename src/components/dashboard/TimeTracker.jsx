import React, { useEffect, useRef, useState } from "react";
import "./TimeTracker.css";

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
  const strokeDashoffset = 238.76 - (238.76 * progressPercentage) / 100;

  return (
    <div className="time-tracker-card">
      <div className="timer-display">
        <svg viewBox="0 0 100 100" className="progress-ring">
          <circle cx="50" cy="50" r="30" fill="#ffffff" />

          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#262626"
            strokeWidth="3.5"
            strokeDasharray="0.6 1.4"
          />

          {/* YELLOW CIRCLE*/}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#FFE885"
            strokeWidth="8"
            strokeDasharray="238.76"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            className="progress-bar"
          />
        </svg>

        <div className="time-text-container">
          <p className="time-text">
            {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
          </p>
          <span className="sub-text">work time</span>
        </div>
      </div>

      <div className="controls-row">
        {/* SELECT TASKS */}
        <div className="task-select-wrapper">
          <button
            type="button"
            onClick={() => setIsTaskOpen((prev) => !prev)}
            className="task-select"
          >
            <span className="task-title">
              {selectedTask ? selectedTask.title : "select task"}
            </span>
            <svg
              className="chevron-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isTaskOpen && (
            <div className="task-dropdown font-sans">
              {allTasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setIsTaskOpen(false);
                  }}
                  className="dropdown-item"
                >
                  {task.title}
                </button>
              ))}
              {allTasks.length === 0 && (
                <p className="dropdown-empty">No tasks available</p>
              )}
            </div>
          )}
        </div>

        {/* BUTTONS S/P/R */}
        <div className="buttons-group">
          <button
            type="button"
            onClick={handleStart}
            aria-label="Start"
            className="btn-icon"
          >
            <svg className="play-icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handlePause}
            aria-label="Pause"
            className="btn-icon"
          >
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset"
            className="btn-icon"
          >
            <svg
              className="reset-icon"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.36-5.36M20 15a9 9 0 01-15.36 5.36"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeTracker;
