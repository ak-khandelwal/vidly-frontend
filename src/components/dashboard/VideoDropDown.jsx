import EditVideoModal from "./EditVideoModal";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  clearVideoState,
  deleteVideo,
  togglePublishStatus,
} from "../../app/slices/videoSlice";
import { useDispatch } from "react-redux";
import DeleteConfirmationModal from "./DeleteConformationModal";

const VideoDropdown = ({ video, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
    setIsOpen(false);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };
  const confirmDelete = async () => {
    try {
      await dispatch(deleteVideo({ videoId: video?._id })).unwrap();
      await dispatch(clearVideoState());
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete video:", error);
      // You might want to show an error notification here
    }
  };
  const handleTogglePublish = async (e) => {
    e.stopPropagation();
    try {
      await dispatch(togglePublishStatus({ videoId: video?._id })).unwrap();
      dispatch(clearVideoState());
      setPage(1);
      setIsOpen(false); // Close dropdown after action
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className="pr-20 relative">
        <button
          onClick={toggleDropdown}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <HiDotsVertical />
        </button>
        {isOpen && (
          <span className="absolute bg-black -right-4 top-0 font-bold text-center z-10">
            <h1
              onClick={handleEdit}
              className="border-purple-400 border-x bg-[#5e3f65b4] px-2 mb-2 cursor-pointer hover:bg-[#6b4975]"
            >
              Edit
            </h1>
            <h1
              onClick={handleTogglePublish}
              className="border-purple-400 border-x bg-[#5e3f65b4] px-2 mb-2 cursor-pointer hover:bg-[#6b4975]"
            >
              {video?.isPublished ? "Unpublish" : "Publish"}
            </h1>
            <h1
              onClick={handleDelete}
              className="border-purple-400 border-x bg-[#5e3f65b4] px-2 mb-2 cursor-pointer hover:bg-[#6b4975]"
            >
              Delete
            </h1>
          </span>
        )}
      </div>
      <EditVideoModal
        video={video}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        videoTitle={video?.title}
      />
    </>
  );
};

export default VideoDropdown;
