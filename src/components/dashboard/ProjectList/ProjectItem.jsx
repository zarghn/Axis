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
  return `${date.day} ${monthName}`;
}

function ProjectItem({ project, isLast, onSelectProject, onEditProject }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-stretch gap-2.5 py-2 px-1 group hover:bg-black/[0.015] rounded-lg transition-colors cursor-pointer">
        <div className="w-[5px] bg-[#FFE885] rounded-full shrink-0 my-0.5" />

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 min-w-0">
              <button
                type="button"
                className="shrink-0 p-0.5"
                aria-label="Edit project"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditProject(project);
                }}
              >
                <img
                  src={pencilIcon}
                  alt=""
                  className="w-3 h-3 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </button>

              <button
                type="button"
                className="shrink-0 p-0.5"
                aria-label="View tasks"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={tasksIcon}
                  alt=""
                  className="w-3 h-3 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </button>
              {/* TITLE */}

              <h3 className="text-neutral-900 text-[14px] font-semibold truncate ml-0.5 tracking-tight">
                {project.title}
              </h3>
            </div>

            <span className="text-neutral-900 text-[13px] font-semibold shrink-0 uppercase tracking-tight">
              {formatDate(project.date)}
            </span>
          </div>

          {/* DESCRIPTION */}
          {project.description && (
            <p className="text-[#a1a1a1] text-[11px] leading-tight mt-1 line-clamp-2 pr-1 font-normal">
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
