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

function Comments({ videoId }) {
  const totalComments = useSelector(selectCommentsCount);
  const [page, setPage] = useState(1);
  return (
    <div className="border-2 rounded-lg mt-4">
      <CommentInput totalComments={totalComments} videoId={videoId} setPage={setPage} />
      <CommentRender videoId={videoId} setPage={setPage} page={page}/>
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
    <div>
      <div>
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
        <div ref={elementRef} className="text-center py-4 ">
          Loading comments...
        </div>
      )}
    </div>
  );
};
const CommentList = ({ content, username, avatar }) => {
  return (
    <div className="p-4 flex gap-4 w-full">
      <img src={avatar} alt="" className="size-10 rounded-full" />
      <div className="w-full">
        <h1 className="inline-block">@{username}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};
const CommentInput = ({ videoId, totalComments, setPage }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (content !== "") {
      try {
        await dispatch(addComment({ videoId, content })).unwrap();
        await dispatch(clearCommentState());
        setPage(0)
        setContent("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  return (
    <div className="flex gap-4 items-start border-b-2 p-4">
      <div className="p-2">
        <div className="border-r-2 mb-4">
          <h1 className="h-full">{totalComments}</h1>
          <h1 className="h-full">Comments</h1>
        </div>
        <button
          className="bg-[#ae7aff] text-black p-2 rounded-sm"
          onClick={(e) => handleSumbit(e)}
        >
          Comment
        </button>
      </div>
      <textarea
        className="w-full bg-transparent font-semibold px-2 py-1 border border-gray-300 rounded-md resize-none focus:outline-none "
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your valuable comment here..."
        rows="4" // Sets the initial height
      ></textarea>
    </div>
  );
};

export default Comments;
