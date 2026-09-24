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

  function handleAddProject(project) {
    setProjects((prevProjects) => [...prevProjects, project]);
  }

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
    <div className="bg-[#FFF8E7] p-5 sm:p-6 rounded-[32px] shadow-sm flex flex-col justify-between h-full w-full overflow-hidden">
      <ProjectTitle
        title="Team Projects"
        description=""
        onAddProject={handleAddProject}
        editingProject={editingProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onCloseEdit={() => setEditingProject(null)}
      />

      {/* FOR SECRET SCROLL :) */}
      <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden flex-1 min-h-0 mt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
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