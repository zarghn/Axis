function TaskItem({ task }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="w-4 h-4 rounded-full border border-zinc-400"
          aria-label="Change task status"
        />

        <span className="text-sm text-black">
          {task.title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-xs text-zinc-500"
        >
          EDIT
        </button>

        <button
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