import AddButton from "./AddButton";
import { useState } from "react";
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

  function handleAddProject() {
    console.log("Add Project clicked");
    setIsAddingProject(true);
  }

  function handleCloseProject() {
    setIsAddingProject(false);
    onCloseEdit?.();
  }
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm font-light">{description}</p>

      <AddButton text="ADD PROJECT" onClick={handleAddProject} />
      <div>
        {isAddingProject || editingProject ? (
          <AddProject
            onClose={handleCloseProject}
            onAddProject={onAddProject}
            onUpdateProject={onUpdateProject}
            onDeleteProject={onDeleteProject}
            editingProject={editingProject}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ProjectTitle;
