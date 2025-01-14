import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateVideo } from "../../app/slices/videoSlice";

const EditVideoModal = ({ video, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    thumbnail: null,
  });
  const [previewUrl, setPreviewUrl] = useState(video?.thumbnail || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || "",
        description: video.description || "",
        thumbnail: null,
      });
      setPreviewUrl(video.thumbnail || "");
    }
  }, [video]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.thumbnail) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    try {
      // You'll need to create this action in your videoSlice
      await dispatch(
        updateVideo({
          videoId: video._id,
          formData: formDataToSend,
        }),
      ).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update video:", error);
    }
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-black border-2 border-purple-400 rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Edit Video</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail
            </label>
            <div className="flex flex-col items-center">
              <img 
                src={previewUrl} 
                alt="Thumbnail preview" 
                className="w-64 h-40 object-cover mb-2 rounded border border-purple-400"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                         file:border file:border-purple-400 file:text-white 
                         file:bg-purple-400/20 hover:file:bg-purple-400/30
                         file:rounded-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded border border-purple-400 bg-black/50 
                       text-white px-3 py-2 focus:outline-none focus:ring-2 
                       focus:ring-purple-400/50"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white hover:bg-purple-400/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white bg-purple-400/20 
                       hover:bg-purple-400/40"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditVideoModal;
