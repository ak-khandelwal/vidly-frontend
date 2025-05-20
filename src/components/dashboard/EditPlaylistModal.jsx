import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaylist } from "../../app/slices/playListSlice";

const EditPlaylistModal = ({ isOpen, onClose, playlist }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.playlist);

  const [formData, setFormData] = useState({
    title: playlist?.playlistName || "",
    description: playlist?.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.title) {
        alert("Title is required!");
        return;
      }

      await dispatch(updatePlaylist({
        playlistId: playlist._id,
        name: formData.title,
        description: formData.description
      })).unwrap();
      
      onClose();
    } catch (error) {
      console.error("Failed to update playlist:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-purple-400">
          <h2 className="text-xl font-bold text-white">Edit Playlist</h2>
        </div>

        <div className="p-4 space-y-4">
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {/* Playlist Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Playlist Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50 disabled:opacity-50"
            />
          </div>

          {/* Playlist Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={loading}
              rows={3}
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="p-4 border-t border-purple-400 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white hover:bg-purple-400/20 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                     font-medium text-white bg-purple-400/20 
                     hover:bg-purple-400/40 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistModal;
