function StatusTabs({ projects, activeProject }) {
  const selectedProject = projects.find(
    (project) => project.title === activeProject?.title,
  );
  if (!selectedProject) {
    return null;
  }
  
  //when project doesnt have any task!
  if (selectedProject.tasks.length === 0) {
    return null;
  }

  const doneTasks = selectedProject.tasks.filter(
    (task) => task.status === "DONE",
  );

  const inProcessTasks = selectedProject.tasks.filter(
    (task) => task.status === "IN PROCESS",
  );

  const notCompleteTasks = selectedProject.tasks.filter(
    (task) => task.status === "NOT STARTED",
  );

  const doneCount = doneTasks.length;
  const inProcessCount = inProcessTasks.length;
  const notCompleteCount = notCompleteTasks.length;

  const totalTasks = selectedProject.tasks.length;

  const donePercentage = (doneCount / totalTasks) * 100;
  const inProcessPercentage = (inProcessCount / totalTasks) * 100;
  const notCompletePercentage = (notCompleteCount / totalTasks) * 100;

  return (
    <div className="flex w-full max-w-xs h-8 gap-[0.5px]">
      {/* DONE */}
      <div
        style={{ width: `${donePercentage}%` }}
        className="flex items-center justify-end px-2 text-xs font-bold text-white bg-[#FFE28A] rounded-lg transition-all duration-300 overflow-hidden whitespace-nowrap"
      >
        %{Math.round(donePercentage)}
      </div>

      {/* IN PROCESS */}
      <div
        style={{ width: `${inProcessPercentage}%` }}
        className="flex items-center justify-end px-2 text-xs font-bold text-white bg-[#D5D5D5] rounded-lg transition-all duration-300 overflow-hidden whitespace-nowrap"
      >
        %{Math.round(inProcessPercentage)}
      </div>

      {/* NOT COMPLETE */}
      <div
        style={{ width: `${notCompletePercentage}%` }}
        className="flex items-center justify-end px-2 text-xs font-bold text-white bg-[#7B7B7B] rounded-lg transition-all duration-300 overflow-hidden whitespace-nowrap"
      >
        %{Math.round(notCompletePercentage)}
      </div>
    </div>
  );
}
export default StatusTabs;