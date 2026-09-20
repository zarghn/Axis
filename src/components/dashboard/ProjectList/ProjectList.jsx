import ProjectTitle from "./ProjectTitle";
import { useState } from "react";
import ProjectItem from "./ProjectItem";

function ProjectList({
  projects,
  setProjects,
  activeProject,
  setActiveProject,
}) {
  const [editingProject, setEditingProject] = useState(null);

  function handleDeleteProject() {
    setProjects((prevProjects) => {
      return prevProjects.filter(
        (project) => project.title !== editingProject?.title,
      );
    });

    if (activeProject?.title === editingProject?.title) {
      setActiveProject(null);
    }
    setEditingProject(null);
  }
  function handleEditProject(project) {
    setEditingProject(project);
  }

  function handleAddProject(project) {
    console.log("PROJECT RECEIVED:", project);

    setProjects((prevProjects) => [...prevProjects, project]);
  }

  function handleUpdateProject(updatedProject) {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.title === editingProject?.title) {
          return {
            ...project,
            title: updatedProject.title,
            description: updatedProject.description,
            date: updatedProject.date,
          };
        }

        return project;
      });
    });

    if (activeProject?.title === editingProject?.title) {
      setActiveProject((prev) => ({
        ...prev,
        title: updatedProject.title,
        description: updatedProject.description,
        date: updatedProject.date,
      }));
    }

    setEditingProject(null);
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
        editingProject={editingProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onCloseEdit={() => setEditingProject(null)}
      />
      <div>
        {projects.map((project, index) => (
          <ProjectItem
            key={index}
            project={project}
            isLast={index === projects.length - 1}
            onSelectProject={handleSelectProject}
            onEditProject={handleEditProject}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
