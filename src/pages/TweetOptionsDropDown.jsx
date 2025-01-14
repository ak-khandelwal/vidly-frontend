import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import EditTweetModal from "./EditTweetModal";
import DeleteTweetModal from "./DeletTweetModal";
const TweetOptionsDropdown = ({ tweet }) => {
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
      // Implement delete tweet logic
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete tweet:", error);
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
          className="p-1 hover:bg-gray-700 rounded-full"
        >
          <HiDotsVertical className="text-white" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-1 bg-black border-2 border-purple-400 rounded-lg shadow-lg z-10">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 text-white hover:bg-purple-400/20"
            >
              Edit Tweet
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-400/20"
            >
              Delete Tweet
            </button>
          </div>
        )}
      </div>

      <EditTweetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tweet={tweet}
      />

      <DeleteTweetModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        tweet={tweet}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default TweetOptionsDropdown;
