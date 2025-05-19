import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVideo, clearVideoState } from "../../app/slices/videoSlice";

const VideoPopUp = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    video: null,
    tags: [],
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentTag, setCurrentTag] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle tag input
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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "video") {
      setFormData((prev) => ({ ...prev, video: file }));

      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const thumbnailFile = new File([blob], "thumbnail.jpg", {
              type: "image/jpeg",
            });

            setFormData((prev) => ({
              ...prev,
              thumbnail: thumbnailFile,
            }));

            const thumbnailUrl = URL.createObjectURL(thumbnailFile);
            setPreviewUrl(thumbnailUrl);
          }
        }, "image/jpeg");
      };
    }

    // For manual fallback or custom image upload (if you still want it)
    if (type === "thumbnail") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };

  const handleSubmit = async () => {
    const { title, description, thumbnail, video, tags } = formData;

    if (!title || !description || !thumbnail || !video || tags.length === 0) {
      alert("All fields marked with * are required! You must add at least one tag.");
      return;
    }
    setIsUploading(true);
    try {
      // Simulate upload progress
      const simulateProgress = () => {
        setUploadProgress((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      };
      const progressInterval = setInterval(simulateProgress, 500);
      await dispatch(
        addVideo({
          title,
          description,
          thumbnail,
          videoFile: video,
          tags,
        }),
      ).unwrap();
      clearInterval(progressInterval);
      setUploadProgress(100);
      dispatch(clearVideoState())
      setTimeout(() => {
        onClose?.();
      }, 1000);
    } catch (error) {
      console.error("Failed to upload video:", error);
    }
  };

  if (isUploading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
        <div className="bg-black border-2 border-purple-400 rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Uploading Video...
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Track your video uploading process.
          </p>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-white mb-2">{formData.video?.name}</p>
                <p className="text-sm text-gray-400">
                  {(formData.video?.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <span className="text-purple-400">{uploadProgress}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white hover:bg-purple-400/20"
            >
              Cancel
            </button>
            <button
              disabled={uploadProgress < 100}
              onClick={onClose}
              className={`px-6 py-2 border border-purple-400 rounded-md text-sm 
                       font-medium text-white ${uploadProgress === 100 ? "bg-purple-400/40 hover:bg-purple-400/60" : "bg-purple-400/20"}`}
            >
              {uploadProgress === 100 ? "Finish" : "Uploading..."}
            </button>
          </div>
        </div>
      </div>
    );
  }
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

          {/* Tags */}
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
        </div>
      </div>
    </div>
  );
};
export default VideoPopUp;
