import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateVideo } from "../../app/slices/videoSlice";

const EditVideoModal = ({ video, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    thumbnail: null,
    tags: video?.tags || [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const [previewUrl, setPreviewUrl] = useState(video?.thumbnail || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || "",
        description: video.description || "",
        thumbnail: null,
        tags: Array.isArray(video.tags) ? video.tags : [],
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

  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
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
    formDataToSend.append("tags", JSON.stringify(formData.tags));
    
    // Handle thumbnail
    if (formData.thumbnail instanceof File) {
      // If new thumbnail was selected, use it
      formDataToSend.append("thumbnail", formData.thumbnail);
    } else {
      // If no new thumbnail, fetch the existing one and convert to File
      try {
        const response = await fetch(video.thumbnail);
        const blob = await response.blob();
        const file = new File([blob], "thumbnail.jpg", { type: "image/jpeg" });
        formDataToSend.append("thumbnail", file);
      } catch (error) {
        console.error("Error fetching existing thumbnail:", error);
        // If there's an error fetching the existing thumbnail, don't include it
        // The backend will handle this case
      }
    }

    try {
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

          {/* Tags Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags * (At least one tag required)
            </label>
            <div className="space-y-3">
              {/* Tags Display */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 
                               bg-purple-400/20 border border-purple-400 
                               rounded-full text-sm text-white"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-purple-400/30 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={handleTagInputChange}
                  onKeyPress={handleTagInputKeyPress}
                  placeholder="Type a tag and press Enter or comma"
                  className="flex-1 rounded border border-purple-400 bg-black/50 
                           text-white px-3 py-2 focus:outline-none focus:ring-2 
                           focus:ring-purple-400/50"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 border border-purple-400 rounded-md text-sm 
                           font-medium text-white bg-purple-400/20 
                           hover:bg-purple-400/40"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Press Enter or comma to add a tag. At least one tag is required.
              </p>
            </div>
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
