import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVideo } from "../../app/slices/videoSlice";

const VideoPopUp = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    video: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }));

      // Create preview URL for thumbnail
      if (type === "thumbnail") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleSubmit = async () => {
    const { title, description, thumbnail, video } = formData;

    if (!title || !description || !thumbnail || !video) {
      alert("All fields marked with * are required!");
      return;
    }

    try {
      await dispatch(
        addVideo({
          title,
          description,
          thumbnail,
          videoFile: video,
        }),
      ).unwrap();
      onClose?.();
    } catch (error) {
      console.error("Failed to upload video:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="bg-black border-2 border-purple-400 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-purple-400 sticky top-0 bg-black">
          <h2 className="text-xl font-bold text-white">Upload Video</h2>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white hover:bg-purple-400/20"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white bg-purple-400/20 
                       hover:bg-purple-400/40"
            >
              Save
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video File *
            </label>
            <div
              className="border-2 border-dashed border-purple-400 rounded-lg p-8 
                          hover:bg-purple-400/10 transition-colors"
            >
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, "video")}
                className="w-full text-sm text-gray-300 
                          file:mr-4 file:py-2 file:px-4 
                          file:border file:border-purple-400 file:text-white 
                          file:bg-purple-400/20 hover:file:bg-purple-400/30
                          file:rounded-full"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail *
            </label>
            <div className="space-y-2">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Thumbnail preview"
                  className="w-64 h-40 object-cover rounded border border-purple-400"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                className="w-full text-sm text-gray-300 
                          file:mr-4 file:py-2 file:px-4 
                          file:border file:border-purple-400 file:text-white 
                          file:bg-purple-400/20 hover:file:bg-purple-400/30
                          file:rounded-full"
              />
            </div>
          </div>

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
              placeholder="Enter video title"
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50"
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
              placeholder="Enter video description"
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPopUp;
