import UserName from "./Username";
import DateTime from "./DateTime";
import EditDelete from "./EditDelete";
import CommentService from "../services/comments";
import { useState } from "react";

const Comment = ({
  noticeId,
  allComments,
  setAllComments,
  commentId,
  firstName,
  lastName,
  date,
  comment,
  oldComment,
}) => {
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [showEditCmnt, setShowEditCmnt] = useState(false);

  const fullName = firstName + " " + lastName;
  const lastComment = oldComment;

  const handleModifyComment = () => {
    setShowEditDelete(!showEditDelete);
  };
  const handleUpdateComment = () => {
    // hide edit delete section
    setShowEditDelete(true);
    // show input field where user can type new comment
    setShowEditCmnt(true);
    // populate input field with comment text
    setUserComment(comment);
  };
  const handleDeleteComment = () => {};

  const handleCancelBtn = () => {
    // hide edit comment form field
    setShowEditCmnt(false);
    // set comment to initial value
    setUserComment("");
    // hide edit delete section
    setShowEditDelete(false);
  };

  // submit edit comment form
  const handleEditComment = (e) => {
    e.preventDefault();
    async function updateComment() {
      try {
        const updatedComment = await CommentService.updateComment(
          1,
          noticeId,
          commentId,
          userComment
        );

        const otherComments = allComments.filter(
          (comment) => !(comment.id === updatedComment[0].id)
        );
        const everyComments = [...allComments, ...otherComments];

        setShowEditCmnt(false);
        setUserComment("");
        setShowEditDelete(false);
        setAllComments(everyComments);
      } catch (error) {
        console.error(error);
      }
    }
    updateComment();
  };
  return (
    <>
      <div data-commentid={commentId} className="">
        <header>
          <div></div>
          <div>
            <div>
              <UserName name={fullName} />
              <DateTime showIcon={false} date={date} time={true} />
            </div>
          </div>
        </header>
        <main>
          <p>
            <span>edited</span>
          </p>
          <div>
            {showEditCmnt === true ? (
              <form id="addComment" onSubmit={handleEditComment}>
                <div>
                  <input
                    type="text"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                  />
                  <button type="submit">
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
                <div>
                  <button onClick={handleCancelBtn}>Cancel</button>
                </div>
              </form>
            ) : (
              <div>
                <p>{comment}</p>
                <div>
                  <span
                    onClick={handleModifyComment}
                    className="material-symbols-outlined"
                  >
                    more_horiz
                  </span>
                  {showEditDelete && (
                    <EditDelete
                      handleEditBtn={handleUpdateComment}
                      handleDeleteBtn={handleDeleteComment}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        <footer>
          {/* todo
            1. Add new comment
            2. Edit comment
            3. Delete comment
          */}
          {/* show only if edit comment section is hidden */}
          {!showEditCmnt && (
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
          )}
        </footer>
      </div>
    </>
  );
};

export default Comment;
