import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import EditPlaylistModal from "./EditPlaylistModal";
import AddVideosModal from "./AddVideosModal";
import DeleteVideosModal from "./DeleteVideosModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
const PlaylistDropdown = ({ playlist, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddVideosModalOpen, setIsAddVideosModalOpen] = useState(false);
  const [isDeleteVideosModalOpen, setIsDeleteVideosModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
    setIsOpen(false);
  };

  const handleAddVideos = async (e) => {
    e.stopPropagation();
    setIsAddVideosModalOpen(true);
    setIsOpen(false);
  };

  const handleDeleteVideos = (e) => {
    e.stopPropagation();
    setIsDeleteVideosModalOpen(true);
    setIsOpen(false);
  };

  const handleDeletePlaylist = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };

  const confirmDeletePlaylist = async () => {
    try {
      // Implement delete playlist logic
      setIsDeleteModalOpen(false);
      setPage(1);
    } catch (error) {
      console.error("Failed to delete playlist:", error);
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
          <span className="absolute bg-black -right-4 top-0 font-bold text-center z-10">
            <h1
              onClick={handleEdit}
              className="border-purple-400 border-x border-t text-white px-4 py-2 hover:bg-purple-400/20 cursor-pointer whitespace-nowrap"
            >
              Edit Playlist
            </h1>
            <h1
              onClick={handleAddVideos}
              className="border-purple-400 border-x text-white px-4 py-2 hover:bg-purple-400/20 cursor-pointer whitespace-nowrap"
            >
              Add Videos
            </h1>
            <h1
              onClick={handleDeleteVideos}
              className="border-purple-400 border-x text-white px-4 py-2 hover:bg-purple-400/20 cursor-pointer whitespace-nowrap"
            >
              Remove Videos
            </h1>
            <h1
              onClick={handleDeletePlaylist}
              className="border-purple-400 border-x border-b text-red-400 px-4 py-2 hover:bg-red-400/20 cursor-pointer whitespace-nowrap"
            >
              Delete Playlist
            </h1>
          </span>
        )}
      </div>

      {/* Modals */}
      <EditPlaylistModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        playlist={playlist}
      />

      <AddVideosModal
        isOpen={isAddVideosModalOpen}
        onClose={() => setIsAddVideosModalOpen(false)}
        playlist={playlist}
      />

      <DeleteVideosModal
        isOpen={isDeleteVideosModalOpen}
        onClose={() => setIsDeleteVideosModalOpen(false)}
        playlist={playlist}
      />

      <DeletePlaylistModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        playlist={playlist}
        onConfirm={confirmDeletePlaylist}
      />
    </>
  );
};

export default PlaylistDropdown;
