import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentService from "../services/comments";

const Comments = ({ noticeId }) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState({
    comment: "",
    isEdit: false,
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (userComment.isEdit) {
      console.log("edit comment");
    } else {
      console.log("new comment");
    }
    setUserComment({ comment: "", isEdit: false });
  };

  const handleCancelSubmitForm = () => {
    setUserComment({ comment: "", isEdit: false });
  };

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
              userComment={userComment}
              setUserComment={setUserComment}
            />
          ))}
        </div>
      ) : null}
      <form id="addComment" onSubmit={handleSubmitComment}>
        <button type="button" onClick={handleCancelSubmitForm}>
          Cancel
        </button>
        <div>
          <textarea
            rows={2}
            cols={50}
            value={userComment["comment"]}
            onChange={(e) =>
              setUserComment({
                ...userComment,
                comment: e.target.value,
              })
            }
            placeholder={
              userComment.isEdit ? "Edit comment..." : "Write comment..."
            }
            required={true}
          />
          <button type="submit">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </form>
    </>
  );
};
export default Comments;
