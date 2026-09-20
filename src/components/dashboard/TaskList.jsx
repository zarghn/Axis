import TaskItem from "./TaskItem";

function TaskList({ activeProject, projects, setProjects }) {
  function handleAddTask() {
    console.log("ADD TASK CLICKED");

    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          const newProject = {
            ...project,
            tasks: [
              ...project.tasks,
              {
                title: "My First Task",
                status: "NOT STARTED",
              },
            ],
          };

          return newProject;
        } else {
          return project;
        }
      });
    });
  }

  function handleChangeStatus(task) {
    let nextStatus;

    if (task.status === "NOT STARTED") {
      nextStatus = "IN PROCESS";
    } else if (task.status === "IN PROCESS") {
      nextStatus = "DONE";
    } else {
      nextStatus = "NOT STARTED";
    }

    console.log(nextStatus);

    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          const updatedTasks = project.tasks.map((currentTask) => {
            if (currentTask === task) {
              return {
                ...currentTask,
                status: nextStatus,
              };
            } else {
              return currentTask;
            }
          });

          return {
            ...project,
            tasks: updatedTasks,
          };
        } else {
          return project;
        }
      });
    });
  }

  function handleDeleteTask(task) {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          const updatedTasks = project.tasks.filter(
            (currentTask) => currentTask !== task,
          );

          return {
            ...project,
            tasks: updatedTasks,
          };
        } else {
          return project;
        }
      });
    });
  }

  function handleEditTask(task, newTitle) {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.title === activeProject?.title) {
          const updatedTasks = project.tasks.map((currentTask) => {
            if (currentTask === task) {
              return {
                ...currentTask,

                title: newTitle,
              };
            } else {
              return currentTask;
            }
          });

          return {
            ...project,
            tasks: updatedTasks,
          };
        } else {
          return project;
        }
      });
    });
  }

  const selectedProject = projects.find(
    (project) => project.title === activeProject?.title,
  );

  console.log("TASK LIST RENDERED");

  return (
    <div>
      <h2>TASKS</h2>

      {activeProject ? (
        <>
          <h3>{activeProject.title}</h3>

          {selectedProject?.tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onChangeStatus={handleChangeStatus}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          ))}

          <button type="button" onClick={handleAddTask}>
            ADD TASK
          </button>
        </>
      ) : (
        <p>Select a project to see its tasks.</p>
      )}
    </div>
  );
}

export default TaskList;
