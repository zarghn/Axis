import ProjectTitle from "./ProjectTitle";
import { useState } from "react";
import ProjectItem from "./ProjectItem";

function ProjectList({ projects, setProjects, setActiveProject }) {
  function handleAddProject(project) {
    console.log("PROJECT RECEIVED:", project);

    setProjects((prevProjects) => [...prevProjects, project]);
  }

  function handleSelectProject(project) {
    setActiveProject(project);
    console.log("ACTIVE PROJECT:", project);
  }

  return (
    <div>
      <ProjectTitle
        title="MY LOVELY PROJECT"
        description="My first React project"
        onAddProject={handleAddProject}
      />

      <div>
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            project={project}
            isLast={index === projects.length - 1}
            onSelectProject={handleSelectProject}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
