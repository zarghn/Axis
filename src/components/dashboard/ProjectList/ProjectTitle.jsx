import React, { useState, useEffect } from "react";
import AddProject from "./AddProject";

function ProjectTitle({
  title,
  description,
  onAddProject,
  editingProject,
  onUpdateProject,
  onDeleteProject,
  onCloseEdit,
}) {
  const [isAddingProject, setIsAddingProject] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsAddingProject(true);
    window.addEventListener("openAddProjectModal", handleOpenModal);
    return () => {
      window.removeEventListener("openAddProjectModal", handleOpenModal);
    };
  }, []);

  function handleCloseProject() {
    setIsAddingProject(false);
    onCloseEdit?.();
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-serif font-bold text-neutral-800">{title}</h2>
      {description && <p className="text-sm font-light text-neutral-500">{description}</p>}

      {(isAddingProject || editingProject) && (
        <AddProject
          onClose={handleCloseProject}
          onAddProject={onAddProject}
          onUpdateProject={onUpdateProject}
          onDeleteProject={onDeleteProject}
          editingProject={editingProject}
        />
      )}
    </div>
  );
}

export default ProjectTitle;