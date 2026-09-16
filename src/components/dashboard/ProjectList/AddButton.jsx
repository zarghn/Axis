function AddButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-yellow-600 text-white"
    >
      {text}
    </button>
  );
}

export default AddButton;
