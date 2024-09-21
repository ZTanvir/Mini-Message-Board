import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentService from "../services/comments";

const Comments = ({ noticeId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getCommentsData(noticeId = noticeId) {
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
  }, [comments]);

  return (
    <>
      {comments.length > 0 ? (
        <h3>
          Comments (
          {comments.length < 10 ? `0${comments.length}` : comments.length})
        </h3>
      ) : null}
      {comments.length > 0
        ? comments.map((comment) => (
            <Comment
              key={comment.id}
              allComments={comments}
              setAllComments={setComments}
              noticeId={noticeId}
              commentId={comment.id}
              firstName={comment.first_name}
              lastName={comment.last_name}
              date={comment.date}
              comment={comment.comment}
              oldComment={comment.old_comment}
            />
          ))
        : null}
    </>
  );
};
export default Comments;
