import React, { useState } from "react";
import ProjectTitle from "./ProjectTitle";
import ProjectItem from "./ProjectItem";

function ProjectList({
  projects,
  setProjects,
  activeProject,
  setActiveProject,
  searchTerm,
}) {
  const [editingProject, setEditingProject] = useState(null);

  function handleDeleteProject() {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.title !== editingProject?.title)
    );
    if (activeProject?.title === editingProject?.title) {
      setActiveProject(null);
    }
    setEditingProject(null);
  }

  function handleEditProject(project) {
    setEditingProject(project);
  }

  function handleAddProject(project) {
    setProjects((prevProjects) => [...prevProjects, project]);
  }

  function handleUpdateProject(updatedProject) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.title === editingProject?.title) {
          return {
            ...project,
            title: updatedProject.title,
            description: updatedProject.description,
            date: updatedProject.date,
          };
        }
        return project;
      })
    );

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
  }

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  return (
    <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-[32px] shadow-xs flex flex-col gap-3 sm:gap-4">
      <ProjectTitle
        title="Team Projects"
        description=""
        onAddProject={handleAddProject}
        editingProject={editingProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onCloseEdit={() => setEditingProject(null)}
      />

      <div className="flex flex-col gap-1 max-h-[350px] sm:max-h-[420px] overflow-y-auto pr-1">
        {filteredProjects.map((project, index) => (
          <ProjectItem
            key={project.id || index}
            project={project}
            isLast={index === filteredProjects.length - 1}
            onSelectProject={handleSelectProject}
            onEditProject={handleEditProject}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;