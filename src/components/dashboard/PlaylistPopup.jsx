import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../app/slices/playListSlice";

const PlaylistPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.playlist);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { title, description } = formData;

    if (!title || !description) {
      alert("All fields marked with * are required!");
      return;
    }

    try {
      await dispatch(createPlaylist({ title, description })).unwrap();
      onClose?.();
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-purple-400 sticky top-0 bg-black">
          <h2 className="text-xl font-bold text-white">Create Playlist</h2>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white hover:bg-purple-400/20 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white bg-purple-400/20 
                       hover:bg-purple-400/40 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Save"}
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter playlist title"
              disabled={loading}
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50 disabled:opacity-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              disabled={loading}
              placeholder="Enter playlist description"
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50 disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPopup;
