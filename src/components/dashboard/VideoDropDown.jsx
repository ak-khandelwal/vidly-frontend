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
import PlaylistSelectorModal from "./PlaylistSelectorModal";
import TonglePublishConformationModal from "./TonglePublishConformationModal";

const VideoDropdown = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTonglePublishModalOpen, setIsTonglePublishModalOpen] =
    useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
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
  const handleTonglePublish = (e) => {
    e.stopPropagation();
    setIsTonglePublishModalOpen(true);
    setIsOpen(false);
  };
  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    setIsPlaylistModalOpen(true);
    setIsOpen(false);
  };
  const confirmDelete = async () => {
    try {
      await dispatch(deleteVideo({ videoId: video?._id })).unwrap();
      dispatch(clearVideoState());
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };
  const conformTongleConform = async () => {
    try {
      await dispatch(togglePublishStatus({ videoId: video?._id })).unwrap();
      dispatch(clearVideoState());
      setIsOpen(false);
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
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <HiDotsVertical />
        </button>
        {isOpen && (
          <span className="absolute bg-black -left-32 -top-10 font-bold text-center z-10">
            <h1
              onClick={handleEdit}
              className="border-purple-400 border-x bg-[#5e3f65b4] px-2 mb-2 cursor-pointer hover:bg-[#6b4975]"
            >
              Edit
            </h1>
            <h1
              onClick={handleTonglePublish}
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
            <h1
              onClick={handleAddToPlaylist}
              className="border-purple-400 border-x bg-[#5e3f65b4] text-nowrap px-2 mb-2 cursor-pointer hover:bg-[#6b4975]"
            >
              Add to Playlist
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
      <TonglePublishConformationModal
        isOpen={isTonglePublishModalOpen}
        onClose={() => setIsTonglePublishModalOpen(false)}
        onConfirm={conformTongleConform}
        videoTitle={video?.title}
        isPublish={video?.isPublished}
      />
      <PlaylistSelectorModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        video={video}
      />
    </>
  );
};

export default VideoDropdown;
