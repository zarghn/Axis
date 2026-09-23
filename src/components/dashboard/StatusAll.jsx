function StatusAll({ projects }) {
  const allTasks = projects.flatMap((project) => project.tasks);
console.log("STATUS ALL:", projects);
console.log("ALL TASKS:", allTasks);
  //when project doesnt have any task!
  if (allTasks.length === 0) {
    return null;
  }

  const doneTasks = allTasks.filter((task) => task.status === "DONE");

  const inProcessTasks = allTasks.filter(
    (task) => task.status === "IN PROCESS",
  );

  const notCompleteTasks = allTasks.filter(
    (task) => task.status === "NOT STARTED",
  );

  const doneCount = doneTasks.length;
  const inProcessCount = inProcessTasks.length;
  const notCompleteCount = notCompleteTasks.length;

  const totalTasks = allTasks.length;

  const donePercentage = (doneCount / totalTasks) * 100;
  const inProcessPercentage = (inProcessCount / totalTasks) * 100;
  const notCompletePercentage = (notCompleteCount / totalTasks) * 100;

  return (
    <div className="flex w-full h-12 gap-3 p-1 rounded-2xl">
      {/* DONE */}
      {donePercentage > 0 && (
        <div
          style={{ width: `${donePercentage}%` }}
          className="bg-[#615E5B] text-white flex items-center justify-center rounded-2xl font-semibold text-sm tracking-wider uppercase px-4 truncate transition-all duration-300"
        >
          DONE!
        </div>
      )}

      {/* IN PROCESS */}
      {inProcessPercentage > 0 && (
        <div
          style={{ width: `${inProcessPercentage}%` }}
          className="bg-[#D8D7D5] text-white flex items-center justify-center rounded-2xl font-semibold text-sm tracking-wider uppercase px-4 truncate transition-all duration-300"
        >
          IN PROCESS ...
        </div>
      )}

      {/* NOT COMPLETE */}
      {notCompletePercentage > 0 && (
        <div
          style={{ width: `${notCompletePercentage}%` }}
          className="bg-white text-[#615E5B] flex items-center justify-center rounded-2xl font-semibold text-sm tracking-wider uppercase px-4 truncate transition-all duration-300"
        >
          NOT COMPLETE
        </div>
      )}
    </div>
  );
}

export default StatusAll;
