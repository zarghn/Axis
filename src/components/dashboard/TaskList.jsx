import React from "react";
import TaskItem from "./TaskItem";
import StatusTabs from "./StatusTabs";

function TaskList({
  activeProject,
  projects,
  setProjects,
  selectedTaskId,
  setSelectedTaskId,
}) {
  function handleAddTask() {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          return {
            ...project,
            tasks: [
              ...project.tasks,
              {
                id: Date.now(),
                title: "new task",
                status: "NOT STARTED",
              },
            ],
          };
        }
        return project;
      }),
    );
  }

  function handleChangeStatus(task) {
    let nextStatus = "NOT STARTED";
    if (task.status === "NOT STARTED") nextStatus = "IN PROCESS";
    else if (task.status === "IN PROCESS") nextStatus = "DONE";

    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          const updatedTasks = project.tasks.map((currentTask) =>
            currentTask === task
              ? { ...currentTask, status: nextStatus }
              : currentTask,
          );
          return { ...project, tasks: updatedTasks };
        }
        return project;
      }),
    );
  }

  function handleDeleteTask(task) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          return {
            ...project,
            tasks: project.tasks.filter((currentTask) => currentTask !== task),
          };
        }
        return project;
      }),
    );
  }

  function handleEditTask(task, newTitle) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          return {
            ...project,
            tasks: project.tasks.map((currentTask) =>
              currentTask === task
                ? { ...currentTask, title: newTitle }
                : currentTask,
            ),
          };
        }
        return project;
      }),
    );
  }

  const selectedProject = projects.find(
    (project) => project.title === activeProject?.title,
  );

  return (
    <div className="bg-[#FFFDF3] p-5 rounded-[36px] shadow-sm flex flex-col justify-between w-full h-full overflow-hidden">
      <div>
        {/* عنوان پروژه و دکمه + */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-semibold text-neutral-900 tracking-tight">
            {activeProject ? activeProject.title : "Project Number 2"}
          </h2>
          <button
            type="button"
            onClick={handleAddTask}
            className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <div className="w-full mt-3">
          <StatusTabs projects={projects} activeProject={activeProject} />
        </div>
      </div>

      <div className="relative flex-1 flex flex-col mt-3 overflow-hidden">
        <div className="w-[82%] h-3 bg-white rounded-t-xl mx-auto border-t border-x border-neutral-200/60 z-10" />

        <div className="w-[91%] h-3 bg-[#636363] rounded-t-xl mx-auto -mt-1.5 z-20" />

        <div className="relative z-30 bg-[#1F1F1F] px-3.5 py-3 -mt-1.5 rounded-[28px] flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-lg flex flex-col gap-2">
          {activeProject && selectedProject?.tasks.length > 0 ? (
            selectedProject.tasks.map((task, index) => (
              <TaskItem
                key={task.id || index}
                task={task}
                onChangeStatus={handleChangeStatus}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
                setSelectedTaskId={setSelectedTaskId}
              />
            ))
          ) : (
            <div className="py-16 text-center flex-1 flex items-center justify-center">
              <p className="text-neutral-400 text-xs font-serif">
                {activeProject
                  ? "No tasks added yet. Click + to create one."
                  : "Select a project to view tasks."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
