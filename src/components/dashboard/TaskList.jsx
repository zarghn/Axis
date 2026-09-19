import TaskItem from "./TaskItem";

function TaskList({ activeProject, projects, setProjects }) {
  function handleAddTask() {
    console.log("ADD TASK CLICKED");
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project === activeProject) {
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
          {selectedProject?.tasks.map((task) => (
            <TaskItem key={task.title} task={task} />
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
