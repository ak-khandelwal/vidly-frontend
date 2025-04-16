import { useEffect, useRef, useState } from "react";
import {
  addComment,
  clearCommentState,
  getComments,
  selectComments,
  selectCommentsCount,
  selectHashMoreComments,
} from "../../app/slices/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiMessageDetail } from "react-icons/bi";

function Comments({ videoId }) {
  const totalComments = useSelector(selectCommentsCount);
  const [page, setPage] = useState(1);

  return (
    <div className="p-5 bg-[#1e1e1e] rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <BiMessageDetail className="text-gray-400" />
        Comments ({totalComments})
      </h2>

      <CommentInput videoId={videoId} setPage={setPage} />
      <CommentRender videoId={videoId} setPage={setPage} page={page} />
    </div>
  );
}

const CommentRender = ({ videoId, page, setPage }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const hasMore = useSelector(selectHashMoreComments);
  const [loading, setLoading] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        setLoading(true);
        dispatch(getComments({ videoId, page, limit: 9 }))
          .unwrap()
          .then(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch Comments:", err);
            setLoading(false);
          });
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [dispatch, page, hasMore, loading, videoId, comments]);

  return (
    <div className="mt-4">
      <div className="space-y-4 divide-y divide-gray-700">
        {comments.map((item, index) => (
          <CommentList
            key={index}
            content={item?.content}
            avatar={item?.owner?.avatar}
            username={item?.owner?.userName}
          />
        ))}
      </div>

      {hasMore === true && (
        <div ref={elementRef} className="text-center py-4 text-gray-400">
          <div className="w-8 h-8 border-t-2 border-[#ae7aff] border-r-2 rounded-full animate-spin mx-auto mb-2"></div>
          Loading more comments...
        </div>
      )}

      {comments.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

const CommentList = ({ content, username, avatar }) => {
  return (
    <div className="py-4 flex gap-4 w-full">
      <img
        src={avatar}
        alt={`${username}'s avatar`}
        className="size-10 rounded-full border border-gray-700"
      />
      <div className="w-full">
        <h3 className="font-medium text-[#ae7aff]">@{username}</h3>
        <p className="mt-1 text-gray-300">{content}</p>
      </div>
    </div>
  );
};

const CommentInput = ({ videoId, setPage }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (content.trim() !== "") {
      try {
        await dispatch(addComment({ videoId, content })).unwrap();
        await dispatch(clearCommentState());
        setPage(0);
        setContent("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="w-full bg-[#272727] text-white font-normal px-4 py-3 border border-gray-700 rounded-lg resize-none focus:outline-none focus:border-[#ae7aff] focus:ring-1 focus:ring-[#ae7aff] transition-colors"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        rows="3"
      ></textarea>
      <div className="flex justify-end mt-3">
        <button
          className={`px-6 py-2 rounded-full font-bold transition-colors ${content.trim() !== ""
              ? "bg-gradient-to-r from-[#8a63d2] to-[#ae7aff] text-black hover:opacity-90"
              : "bg-[#323232] text-gray-400 cursor-not-allowed"
            }`}
          onClick={(e) => handleSumbit(e)}
          disabled={content.trim() === ""}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
