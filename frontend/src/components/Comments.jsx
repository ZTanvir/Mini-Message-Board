import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ noticeId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      {comments.length > 0 ? <h3>Comments:{comments.length}</h3> : null}
      {comments.length > 0
        ? comments.map((comment) => (
            <Comment
              key={comment.id}
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
