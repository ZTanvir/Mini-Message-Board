import UserName from "./Username";
import DateTime from "./DateTime";
import EditDelete from "./EditDelete";
import Dialog from "./Dialog";
import DeleteRecord from "./Form/DeleteRecord";
import CommentService from "../services/comments";
import { useState } from "react";

const Comment = ({ noticeId, allComments, setAllComments, commentData }) => {
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [showEditCmnt, setShowEditCmnt] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const { id, first_name, last_name, date, comment, old_comment } = commentData;
  const fullName = first_name + " " + last_name;
  const commentId = id;
  const lastComment = old_comment;

  const handleModifyComment = () => {
    setShowEditDelete(!showEditDelete);
  };
  const handleUpdateUi = () => {
    // hide edit delete section
    setShowEditDelete(true);
    // show input field where user can type new comment
    setShowEditCmnt(true);
    // populate input field with comment text
    setUserComment(comment);
  };
  const handleDeleteUi = () => {
    setIsShowDialog(true);
    setShowEditDelete(false);
  };

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
        const everyComments = [...otherComments, ...updatedComment];

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

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  const handleDeleteComment = () => {
    async function deleteComment() {
      const deletedComment = await CommentService.deleteComment(
        noticeId,
        commentId
      );
      if (deleteComment.message !== "Comment not found") {
        const othersComments = allComments.filter(
          (cmnt) => !(cmnt.id === deletedComment.id)
        );
        setAllComments(othersComments);
      }
    }
    deleteComment();
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
                      handleEditBtn={handleUpdateUi}
                      handleDeleteBtn={handleDeleteUi}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          {isShowDialog && (
            <Dialog
              isOpen={true}
              onClose={handleCloseDialog}
              name="deleteComment"
            >
              <DeleteRecord
                onDelete={handleDeleteComment}
                onCancel={handleCloseDialog}
              />
            </Dialog>
          )}
        </main>
      </div>
    </>
  );
};

export default Comment;
