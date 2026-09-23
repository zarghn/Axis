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
      })
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
              : currentTask
          );
          return { ...project, tasks: updatedTasks };
        }
        return project;
      })
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
      })
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
                : currentTask
            ),
          };
        }
        return project;
      })
    );
  }

  const selectedProject = projects.find(
    (project) => project.title === activeProject?.title
  );

  return (
    <div className="bg-[#FFFDF3] p-5 rounded-[36px] shadow-sm flex flex-col gap-4 w-full">
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

      {/* نوار درصد وضعیت‌ها */}
      <div className="w-full">
        <StatusTabs projects={projects} activeProject={activeProject} />
      </div>

      {/* لایه‌های کارت روی هم دقیقاً طبق Figma */}
      <div className="relative pt-3">
        {/* لایه ۱: سفید بالاترین لایه تاشده */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[84%] h-4 bg-white rounded-t-2xl z-0 border border-neutral-200/50" />
        {/* لایه ۲: خاکستری مایل به تیره */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[91%] h-4 bg-[#636363] rounded-t-2xl z-10" />

        {/* باکس اصلی مشکی رنگ */}
        <div className="relative z-20 bg-[#1F1F1F] px-3.5 py-4 rounded-[28px] max-h-[380px] overflow-y-auto custom-scrollbar shadow-lg">
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
            <div className="py-10 text-center">
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