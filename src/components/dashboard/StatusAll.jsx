import React from "react";

function StatusAll({ projects = [] }) {
  const allTasks = projects.flatMap((project) => project?.tasks || []);

  if (allTasks.length === 0) {
    return null;
  }

  const doneTasks = allTasks.filter((task) => task?.status === "DONE");
  const inProcessTasks = allTasks.filter(
    (task) => task?.status === "IN PROCESS",
  );
  const notCompleteTasks = allTasks.filter(
    (task) => task?.status === "NOT STARTED",
  );

  const totalTasks = allTasks.length;

  const donePercentage = (doneTasks.length / totalTasks) * 100;
  const inProcessPercentage = (inProcessTasks.length / totalTasks) * 100;
  const notCompletePercentage = (notCompleteTasks.length / totalTasks) * 100;

  return (
    <div className="w-full my-3">
      <div className="flex flex-col md:flex-row items-stretch w-full gap-3">
        {/* DONE */}
        {donePercentage > 0 && (
          <div
            style={{
              "--md-width": `${donePercentage}%`,
            }}
            className="bg-[#52504D] text-white flex items-center justify-center rounded-2xl font-semibold text-xs md:text-sm tracking-wider uppercase h-11 px-4 shadow-xs truncate w-full md:w-[var(--md-width)] transition-all duration-300"
          >
            DONE!
          </div>
        )}

        {/* IN PROCESS */}
        {inProcessPercentage > 0 && (
          <div
            style={{
              "--md-width": `${inProcessPercentage}%`,
            }}
            className="bg-[#D2D1CF] text-white flex items-center justify-center rounded-2xl font-semibold text-xs md:text-sm tracking-wider uppercase h-11 px-4 shadow-xs truncate w-full md:w-[var(--md-width)] transition-all duration-300"
          >
            IN PROCESS ...
          </div>
        )}

        {/* NOT COMPLETE */}
        {notCompletePercentage > 0 && (
          <div
            style={{
              "--md-width": `${notCompletePercentage}%`,
            }}
            className="bg-white text-[#615E5B] flex items-center justify-center rounded-2xl font-semibold text-xs md:text-sm tracking-wider uppercase h-11 px-4 shadow-xs truncate w-full md:w-[var(--md-width)] transition-all duration-300"
          >
            NOT COMPLETE
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusAll;
