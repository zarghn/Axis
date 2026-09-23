import React from "react";
import pencilIcon from "../../../assets/icons/pencil.png";
import tasksIcon from "../../../assets/icons/tasks.png";

const MONTH_NAMES = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function formatDate(date) {
  if (!date) return "";
  const monthName = MONTH_NAMES[date.month];
  const year = String(date.year).slice(-2);
  return `${date.day} ${monthName} '${year}`;
}

function ProjectItem({ project, isLast, onSelectProject, onEditProject }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-stretch gap-3 py-3 group hover:bg-black/[0.02] rounded-xl px-2 transition-colors cursor-pointer">
        {/* Yellow accent bar */}
        <div className="w-1.5 bg-[#FFE885] rounded-full shrink-0 my-0.5" />

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {/* Edit Button */}
              <button
                type="button"
                className="shrink-0 p-1 rounded-full hover:bg-neutral-200/60 transition"
                aria-label="Edit project"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditProject(project);
                }}
              >
                <img
                  src={pencilIcon}
                  alt=""
                  className="w-3.5 h-3.5 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </button>

              {/* View Tasks Button */}
              <button
                type="button"
                className="shrink-0 p-1 rounded-full hover:bg-neutral-200/60 transition"
                aria-label="View tasks"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={tasksIcon}
                  alt=""
                  className="w-3.5 h-3.5 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </button>

              {/* Title */}
              <h3 className="text-neutral-800 text-base font-medium truncate">
                {project.title}
              </h3>
            </div>

            {/* Date */}
            <span className="text-neutral-900 text-xs font-bold shrink-0 uppercase tracking-tight">
              {formatDate(project.date)}
            </span>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-neutral-400 text-xs leading-relaxed mt-1 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="border-b border-dashed border-neutral-200/80 w-full my-1" />
      )}
    </div>
  );
}

export default ProjectItem;