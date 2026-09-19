import ProjectList from "../components/dashboard/ProjectList/ProjectList";
import { useState } from "react";
import TaskList from "../components/dashboard/TaskList";

function DashboardPage() {
  const [activeProject, setActiveProject] = useState(null);
  const [projects, setProjects] = useState([]);
  return (
    <>
      <ProjectList
        projects={projects}
        setProjects={setProjects}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <TaskList
        activeProject={activeProject}
        projects={projects}
        setProjects={setProjects}
      />{" "}
    </>
  );
}

export default DashboardPage;
