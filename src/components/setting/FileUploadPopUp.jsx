import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiCloseLine, RiUploadCloud2Line } from "react-icons/ri";

function FileUploadPopUp({
  setImage,
  setBulb,
  image,
  children,
  handleSubmit,
  loading,
  cancelPopUp,
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setBulb(file);
        setImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-75">
      <div className="bg-zinc-800 rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">{children}</h3>
          <button
            onClick={cancelPopUp}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        <div
          className={`p-6 ${isDragging ? "bg-zinc-700" : "bg-zinc-800"}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div
            className={`border-2 border-dashed rounded-lg ${isDragging ? "border-purple-500" : "border-zinc-600"} p-6 flex flex-col items-center justify-center h-64 transition-colors duration-300 relative`}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={({ target: { files } }) => {
                if (files && files.length > 0) {
                  setBulb(files[0]);
                  setImage(URL.createObjectURL(files[0]));
                }
              }}
            />

            {image ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={image}
                  alt="Upload preview"
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
            ) : (
              <div className="text-center">
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm text-gray-300">
                    Drag and drop an image, or click to select
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-zinc-700 flex justify-end gap-4">
          <button
            onClick={cancelPopUp}
            disabled={loading}
            className="px-4 py-2 border border-zinc-600 rounded-md text-gray-300 hover:bg-zinc-700 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !image}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              image
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 bg-opacity-50 text-gray-300 cursor-not-allowed"
            } transition-colors duration-300`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <>
                <RiUploadCloud2Line />
                Upload
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadPopUp;
