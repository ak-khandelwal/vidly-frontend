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
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFileChange = (e, type) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [type]: file,
  //     }));
  //     
  //     // Create preview URL for thumbnail
  //     if (type === "thumbnail") {
  //       const url = URL.createObjectURL(file);
  //       setPreviewUrl(url);
  //     }
  //   }
  // };

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
    const { title, description, thumbnail, video } = formData;

    if (!title || !description || !thumbnail || !video) {
      alert("All fields marked with * are required!");
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
        </div>
      </div>
    </div>
  );
};
export default VideoPopUp;
