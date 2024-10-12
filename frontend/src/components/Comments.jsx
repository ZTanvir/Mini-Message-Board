import { useEffect, useState, useRef } from "react";
import style from "../styles/comments.module.css";
import Comment from "./Comment";
import CommentService from "../services/comments";

const Comments = ({ noticeId }) => {
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState({
    comment: "",
    isEdit: false,
  });

  const addCommentTextAreaEl = useRef(null);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (userComment.isEdit) {
      const commentId = userComment.commentId;
      const commentText = userComment.comment;
      async function updateComment() {
        try {
          const updatedComment = await CommentService.updateComment(
            1,
            noticeId,
            commentId,
            commentText
          );

          const otherComments = comments.filter(
            (comment) => !(comment.id === updatedComment[0].id)
          );

          const everyComments = [...otherComments, ...updatedComment];
          setComments(everyComments);
        } catch (error) {
          console.error(error);
        }
      }
      updateComment();
    } else {
      const commentText = userComment.comment;
      // fixed user 1
      // update here when add authentication
      const userId = 1;
      async function addComment() {
        try {
          const addComment = await CommentService.addComment(
            noticeId,
            userId,
            commentText
          );
          const allComments = comments.concat(addComment[0]);
          setComments(allComments);
        } catch (error) {
          console.error(error);
        }
      }
      addComment();
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
        <section className={style.commentsContainer}>
          <h3 className={style.totalComment}>
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
              commentFormBoxEl={addCommentTextAreaEl}
            />
          ))}
        </section>
      ) : null}
      <form
        id={style.addCommentForm}
        onSubmit={handleSubmitComment}
        encType="multipart/form-data"
      >
        <button type="button" onClick={handleCancelSubmitForm}>
          Cancel
        </button>
        <div className={style.addCommentContainer}>
          <textarea
            ref={addCommentTextAreaEl}
            rows={1}
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
