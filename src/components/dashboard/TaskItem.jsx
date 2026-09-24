import React, { useEffect, useRef, useState } from "react";

function TaskItem({
  task,
  onChangeStatus,
  onDeleteTask,
  onEditTask,
  setSelectedTaskId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);
  const taskRef = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (taskRef.current && !taskRef.current.contains(event.target)) {
        onEditTask(task, value);
        setIsEditing(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [value, task, onEditTask]);

  let statusCircle = "border border-[#FFE885] bg-transparent"; // NOT STARTED
  if (task.status === "DONE") {
    statusCircle = "bg-[#FFE885] border-none"; // DONE
  } else if (task.status === "IN PROCESS") {
    statusCircle = "bg-[#8E8E8E] border-none"; // IN PROCESS
  }

  return (
    <div
      ref={taskRef}
      onClick={() => setSelectedTaskId(task.id)}
      className="flex items-center gap-3 w-full my-2 cursor-pointer select-none px-1"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChangeStatus(task);
        }}
        type="button"
        className={`w-5 h-5 rounded-full shrink-0 transition-all ${statusCircle}`}
      />

      <div className="flex-1 flex items-center justify-between bg-[#5E5E5E]/80 hover:bg-[#686868] text-white rounded-full px-3.5 py-1.5 transition-colors min-w-0">
        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent text-[11px] font-normal text-white px-1 w-full focus:outline-none border-b border-white/40"
            autoFocus
          />
        ) : (
          <span className="text-[11px] font-normal text-neutral-100 truncate tracking-tight">
            {task.title}
          </span>
        )}

        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            type="button"
            className="text-neutral-300 hover:text-white transition p-0.5"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task);
            }}
            type="button"
            className="text-neutral-300 hover:text-rose-400 transition p-0.5"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
