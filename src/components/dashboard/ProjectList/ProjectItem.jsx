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

// SHOW DATE LIKE = 12 JUN '25
function formatDate(date) {
  if (!date) return "";

  const monthName = MONTH_NAMES[date.month];
  const year = String(date.year).slice(-2);

  return `${date.day} ${monthName} '${year}`;
}

function ProjectItem({ project, isLast, onSelectProject, onEditProject }) {
  const iconFilterStyle = {
    filter:
      "invert(48%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(96%) contrast(89%)",
  };

  return (
    <>
      <div className="flex items-stretch gap-3 font-['Readex_Pro']">
        {/* Yellow line */}
        <div className="w-1.5 bg-[#FDE047] rounded-full shrink-0 my-0.5" />

        {/* Title + Description */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-baseline justify-between gap-2">
            {/* Title + Icons */}
            <div className="flex items-center gap-1.5 min-w-0">
              {/* Edit */}
              <button
                type="button"
                className="shrink-0"
                aria-label="Edit project"
                onClick={() => onEditProject(project)}
              >
                <img
                  src={pencilIcon}
                  alt=""
                  style={iconFilterStyle}
                  className="w-3.5 h-3.5 object-contain"
                />
              </button>

              {/* Tasks */}
              <button
                type="button"
                className="shrink-0"
                aria-label="View tasks"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={tasksIcon}
                  alt=""
                  style={iconFilterStyle}
                  className="w-3.5 h-3.5 object-contain"
                />
              </button>

              {/* Project Title */}
              <h3 className="text-black text-[15px] font-normal leading-tight truncate">
                {project.title}
              </h3>
            </div>

            {/* Date */}
            <span className="text-black text-lg font-light shrink-0 text-right whitespace-nowrap">
              {formatDate(project.date)}
            </span>
          </div>

          {/* Description */}
          <p className="text-neutral-400 text-[10px] leading-relaxed mt-1 line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Divider */}
      {!isLast && (
        <div className="border-b border-dotted border-zinc-300 w-full my-3.5" />
      )}
    </>
  );
}

export default ProjectItem;
