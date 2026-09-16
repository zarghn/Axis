function AddProject({ onClose }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">ADD NEW PROJECT</h2>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
      >
        CLOSE
      </button>
    </div>
  );
}
export default AddProject;
