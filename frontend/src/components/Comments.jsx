import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentService from "../services/comments";

const Comments = ({ noticeId }) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    async function getCommentsData(noticeId) {
      try {
        const data = await CommentService.getComments(noticeId);

        if (data.message !== "no comments") {
          setComments([...data]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCommentsData(noticeId);
    console.log("effect run");

    return () => {};
  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <div>
          <h3>
            Comments (
            {comments.length < 10 ? `0${comments.length}` : comments.length})
          </h3>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              allComments={comments}
              setAllComments={setComments}
              noticeId={noticeId}
              commentData={comment}
            />
          ))}
        </div>
      ) : null}
      <form id="addComment">
        <input
          type="text"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </>
  );
};
export default Comments;
