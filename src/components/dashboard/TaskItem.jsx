import { useEffect, useRef, useState } from "react";

function TaskItem({ task, onChangeStatus, onDeleteTask, onEditTask }) {
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

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [value, task, onEditTask]);
  return (
    <div ref={taskRef} className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChangeStatus(task)}
          type="button"
          className="w-4 h-4 rounded-full border border-zinc-400"
          aria-label="Change task status"
        />

        {isEditing ? (
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        ) : (
          <span className="text-sm text-black">{task.title}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          type="button"
          className="text-xs text-zinc-500"
        >
          EDIT
        </button>

        <button
          onClick={() => onDeleteTask(task)}
          type="button"
          className="text-xs text-red-400"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
